"""Verify showcase wire endpoints land on card dots on /features."""
import json
import os
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

import websocket

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9388
PROFILE = Path(__file__).resolve().parent / f".chrome-profile-wires-{os.getpid()}"


def get_json(path: str):
    with urllib.request.urlopen(f"http://127.0.0.1:{PORT}{path}", timeout=5) as r:
        return json.loads(r.read().decode("utf-8"))


def wait_targets(timeout=20):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            pages = [p for p in get_json("/json/list") if p.get("type") == "page"]
            if pages:
                return pages
        except Exception as e:
            last = e
        time.sleep(0.25)
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
        mid = 0

        def send(method, params=None, timeout=60):
            nonlocal mid
            mid += 1
            cur = mid
            ws.send(json.dumps({"id": cur, "method": method, "params": params or {}}))
            end = time.time() + timeout
            while time.time() < end:
                try:
                    raw = ws.recv()
                except Exception:
                    continue
                data = json.loads(raw)
                if data.get("id") == cur:
                    if "error" in data:
                        raise RuntimeError(data["error"])
                    return data.get("result", {})
            raise TimeoutError(method)

        send("Page.enable")
        send("Runtime.enable")
        send("Page.navigate", {"url": "http://127.0.0.1:3000/features"})
        time.sleep(5)
        send(
            "Runtime.evaluate",
            {
                "expression": "new Promise(r => setTimeout(r, 2000))",
                "awaitPromise": True,
            },
        )

        result = send(
            "Runtime.evaluate",
            {
                "expression": """(() => {
  const h1 = document.querySelector('h1')?.textContent || '';
  if (h1.includes('couldn')) return { error: h1, text: document.body.innerText.slice(0, 200) };
  const sections = [...document.querySelectorAll('section[id]')].filter(s =>
    s.querySelector('[data-showcase-anchor]')
  );
  return sections.map(section => {
    section.scrollIntoView({ block: 'center' });
    return null;
  }), new Promise(r => setTimeout(r, 800)).then(() => sections.map(section => {
    const svg = section.querySelector('svg');
    const paths = svg ? [...svg.querySelectorAll('path')] : [];
    const starts = svg ? [...svg.querySelectorAll('circle')].length : 0;
    const dots = [...section.querySelectorAll('[data-showcase-dot]')].filter(d => d.getBoundingClientRect().width > 0);
    const pathEnds = paths.map(p => {
      const len = p.getTotalLength();
      const pt = p.getPointAtLength(len);
      return { x: pt.x, y: pt.y };
    });
    const container = svg?.parentElement;
    const cRect = container?.getBoundingClientRect();
    const dotCenters = dots.map(d => {
      const r = d.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - (cRect?.left || 0),
        y: r.top + r.height / 2 - (cRect?.top || 0),
      };
    });
    const gaps = pathEnds.map((end, i) => {
      const dot = dotCenters[i];
      if (!dot) return null;
      return Math.round(Math.hypot(end.x - dot.x, end.y - dot.y) * 10) / 10;
    });
    return {
      id: section.id,
      paths: paths.length,
      startCircles: starts,
      dots: dots.length,
      gaps,
      maxGap: gaps.length ? Math.max(...gaps.filter(g => g != null)) : null,
    };
  }));
})()""",
                "returnByValue": True,
                "awaitPromise": True,
            },
        )
        print(json.dumps(result.get("result", {}).get("value"), indent=2))
    finally:
        try:
            ws.close()
        except Exception:
            pass
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)


if __name__ == "__main__":
    main()
