import base64
import json
import os
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

import websocket

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9355
OUT = Path(__file__).resolve().parent / "how-final.png"
PROFILE = Path(__file__).resolve().parent / f".chrome-profile-how2-{os.getpid()}"


def get_json(path: str):
    with urllib.request.urlopen(f"http://127.0.0.1:{PORT}{path}", timeout=5) as r:
        return json.loads(r.read().decode("utf-8"))


def wait_targets(timeout=25):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            pages = [p for p in get_json("/json/list") if p.get("type") == "page"]
            if pages:
                return pages
        except Exception as e:
            last = e
        time.sleep(0.3)
    raise RuntimeError(f"no chrome targets: {last}")


def main():
    if PROFILE.exists():
        shutil.rmtree(PROFILE, ignore_errors=True)
    PROFILE.mkdir(parents=True, exist_ok=True)

    proc = subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={PORT}",
            f"--user-data-dir={PROFILE}",
            "--remote-allow-origins=*",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--window-size=1440,980",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        pages = wait_targets()
        ws = websocket.create_connection(pages[0]["webSocketDebuggerUrl"], timeout=60)
        ws.settimeout(90)
        msg_id = 0

        def send(method, params=None, timeout=60):
            nonlocal msg_id
            msg_id += 1
            current = msg_id
            ws.send(json.dumps({"id": current, "method": method, "params": params or {}}))
            deadline = time.time() + timeout
            while time.time() < deadline:
                try:
                    raw = ws.recv()
                except Exception:
                    continue
                data = json.loads(raw)
                if data.get("id") == current:
                    if "error" in data:
                        raise RuntimeError(data["error"])
                    return data.get("result", {})
            raise TimeoutError(method)

        send("Page.enable")
        send("Runtime.enable")
        send("Page.navigate", {"url": "http://127.0.0.1:3000/?v=how-final"})
        time.sleep(9)

        metrics = send(
            "Runtime.evaluate",
            {
                "expression": """(() => {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                  const section = document.querySelector('.how-section');
                  section.scrollIntoView({block:'start'});
                  window.scrollBy(0, -24);
                  const cards = [...document.querySelectorAll('.how-card')].map(el => {
                    const r = el.getBoundingClientRect();
                    return {cx: r.left + r.width/2, top: r.top, bottom: r.bottom, h: r.height};
                  });
                  const nodes = [...document.querySelectorAll('.how-timeline .how-timeline-node')].map(el => {
                    const r = el.getBoundingClientRect();
                    return {cx: r.left + r.width/2, cy: r.top + r.height/2};
                  });
                  const line = document.querySelector('.how-timeline-line');
                  const lr = line.getBoundingClientRect();
                  const diffs = cards.map((c,i) => Math.abs(c.cx - (nodes[i]?.cx ?? 0)));
                  return {
                    cards: cards.length,
                    nodes: nodes.length,
                    cardHeights: cards.map(c => Math.round(c.h)),
                    centerDiffs: diffs.map(d => Math.round(d*10)/10),
                    lineLeft: Math.round(lr.left),
                    lineRight: Math.round(lr.right),
                    firstNode: nodes[0] && Math.round(nodes[0].cx),
                    lastNode: nodes[3] && Math.round(nodes[3].cx),
                    lineThroughNodes: nodes.every(n => Math.abs(n.cy - (lr.top+lr.height/2)) < 3),
                    timelineDisplay: getComputedStyle(document.querySelector('.how-timeline')).display
                  };
                })()""",
                "returnByValue": True,
            },
        )
        print("metrics", json.dumps(metrics.get("result", {}).get("value"), indent=2))

        time.sleep(0.8)
        result = send("Page.captureScreenshot", {"format": "png", "fromSurface": True}, timeout=90)
        OUT.write_bytes(base64.b64decode(result["data"]))
        print(f"wrote {OUT} bytes={OUT.stat().st_size}")
        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)


if __name__ == "__main__":
    main()
