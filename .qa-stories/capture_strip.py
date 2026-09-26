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
PORT = 9356
OUT = Path(__file__).resolve().parent / "hero-strip-now.png"
PROFILE = Path(__file__).resolve().parent / f".chrome-{os.getpid()}"


def get_json(path: str):
    with urllib.request.urlopen(f"http://127.0.0.1:{PORT}{path}", timeout=5) as r:
        return json.loads(r.read().decode("utf-8"))


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
        pages = None
        for _ in range(40):
            try:
                pages = get_json("/json/list")
                if pages:
                    break
            except Exception:
                pass
            time.sleep(0.25)
        ws = websocket.create_connection(pages[0]["webSocketDebuggerUrl"], timeout=60)
        ws.settimeout(60)
        mid = 0

        def send(method, params=None):
            nonlocal mid
            mid += 1
            cur = mid
            ws.send(json.dumps({"id": cur, "method": method, "params": params or {}}))
            while True:
                data = json.loads(ws.recv())
                if data.get("id") == cur:
                    if "error" in data:
                        raise RuntimeError(data["error"])
                    return data.get("result", {})

        send("Page.enable")
        send("Runtime.enable")
        send("Page.navigate", {"url": "http://127.0.0.1:3000/"})
        time.sleep(7)
        info = send(
            "Runtime.evaluate",
            {
                "expression": """(() => {
                  const err = document.querySelector('nextjs-portal, [data-nextjs-dialog]');
                  const s = document.querySelector('.hero-strip');
                  if (!s) return { ok: false, hasErrorOverlay: !!err, body: document.body?.innerText?.slice(0,200) };
                  const r = s.getBoundingClientRect();
                  const cs = getComputedStyle(s);
                  return {
                    ok: true,
                    hasErrorOverlay: !!err,
                    w: r.width, h: r.height, top: r.top,
                    opacity: cs.opacity, display: cs.display,
                    items: s.querySelectorAll('.hero-strip-item').length,
                    text: s.innerText.replace(/\\s+/g,' ').slice(0,160)
                  };
                })()""",
                "returnByValue": True,
            },
        )
        print("info", json.dumps(info.get("result", info), indent=2))
        send(
            "Runtime.evaluate",
            {
                "expression": "document.querySelector('.hero-strip')?.scrollIntoView({block:'end'}); true",
                "returnByValue": True,
            },
        )
        time.sleep(0.8)
        shot = send("Page.captureScreenshot", {"format": "png", "fromSurface": True})
        OUT.write_bytes(base64.b64decode(shot["data"]))
        print("wrote", OUT, OUT.stat().st_size)
        ws.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=4)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)


if __name__ == "__main__":
    main()
