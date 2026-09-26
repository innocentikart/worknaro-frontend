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
PORT = 9351
OUT = Path(__file__).resolve().parent / "how-live.png"
OUT_CROP = Path(__file__).resolve().parent / "how-live-crop.png"
PROFILE = Path(__file__).resolve().parent / f".chrome-profile-how-{os.getpid()}"


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
            "--window-size=1440,1100",
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
        send("Network.enable")

        # Confirm server is up first
        with urllib.request.urlopen("http://127.0.0.1:3000/", timeout=30) as r:
            print("server status", r.status, "bytes", len(r.read()))

        nav = send("Page.navigate", {"url": "http://127.0.0.1:3000/?v=how-qa4"})
        print("nav", nav)
        time.sleep(10)

        info = send(
            "Runtime.evaluate",
            {
                "expression": """(() => ({
                  href: location.href,
                  title: document.title,
                  ready: document.readyState,
                  bodyLen: document.body ? document.body.innerHTML.length : 0,
                  hasHow: !!document.querySelector('.how-section'),
                  howId: !!document.getElementById('how-heading'),
                  text: (document.body && document.body.innerText || '').slice(0, 200)
                }))()""",
                "returnByValue": True,
            },
        )
        print("info", info)

        for attempt in range(12):
            found = send(
                "Runtime.evaluate",
                {
                    "expression": """(() => {
                      document.documentElement.classList.remove('dark');
                      localStorage.setItem('theme', 'light');
                      const el = document.querySelector('.how-section') || document.getElementById('how-heading');
                      if (!el) return {ok:false, attempt:true};
                      const section = el.closest('section') || el;
                      section.scrollIntoView({block:'center'});
                      const r = section.getBoundingClientRect();
                      const tl = document.querySelector('.how-timeline');
                      return {
                        ok:true,
                        cards: document.querySelectorAll('.how-card').length,
                        nodes: document.querySelectorAll('.how-timeline .how-timeline-node').length,
                        display: tl ? getComputedStyle(tl).display : null,
                        top: r.top,
                        height: r.height,
                        width: r.width
                      };
                    })()""",
                    "returnByValue": True,
                },
            )
            print("found", found)
            if found.get("result", {}).get("value", {}).get("ok"):
                break
            time.sleep(1.5)

        time.sleep(1.0)
        result = send("Page.captureScreenshot", {"format": "png", "fromSurface": True}, timeout=90)
        OUT.write_bytes(base64.b64decode(result["data"]))
        print(f"wrote {OUT} bytes={OUT.stat().st_size}")

        box = send(
            "Runtime.evaluate",
            {
                "expression": """(() => {
                  const el = document.querySelector('.how-section');
                  if (!el) return null;
                  const r = el.getBoundingClientRect();
                  return {x: Math.max(0,r.x), y: Math.max(0,r.y), width: r.width, height: Math.min(r.height, 920)};
                })()""",
                "returnByValue": True,
            },
        )
        b = box.get("result", {}).get("value")
        print("box", b)
        if b and b.get("width"):
            clip = send(
                "Page.captureScreenshot",
                {
                    "format": "png",
                    "fromSurface": True,
                    "clip": {
                        "x": b["x"],
                        "y": b["y"],
                        "width": b["width"],
                        "height": b["height"],
                        "scale": 1,
                    },
                },
                timeout=90,
            )
            OUT_CROP.write_bytes(base64.b64decode(clip["data"]))
            print(f"wrote crop {OUT_CROP} bytes={OUT_CROP.stat().st_size}")

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
