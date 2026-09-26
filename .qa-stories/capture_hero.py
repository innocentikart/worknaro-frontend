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
PORT = 9361
OUT = Path(__file__).resolve().parent / "hero-broken.png"
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
            "--window-size=1440,900",
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
        send(
            "Emulation.setEmulatedMedia",
            {"features": [{"name": "prefers-color-scheme", "value": "dark"}]},
        )
        send("Page.navigate", {"url": "http://127.0.0.1:3000/"})
        time.sleep(5)
        # force dark class
        send(
            "Runtime.evaluate",
            {
                "expression": "document.documentElement.classList.add('dark'); localStorage.setItem('app-skin','app-skin-dark'); true",
                "returnByValue": True,
            },
        )
        time.sleep(1)
        info = send(
            "Runtime.evaluate",
            {
                "expression": """(() => {
                  const s = document.querySelector('.hero-showcase');
                  const m = document.querySelector('.main-dashboard');
                  const p = document.querySelector('.projects-dashboard');
                  const stage = document.querySelector('.hero-stage');
                  const box = (el) => el ? el.getBoundingClientRect() : null;
                  return {
                    stage: box(stage),
                    showcase: box(s),
                    main: box(m),
                    projects: box(p),
                    showcaseH: s ? getComputedStyle(s).height : null,
                    overflowX: document.documentElement.scrollWidth > window.innerWidth,
                    bodyText: document.body.innerText.slice(0,120)
                  };
                })()""",
                "returnByValue": True,
            },
        )
        print(json.dumps(info.get("result", info), indent=2))
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
