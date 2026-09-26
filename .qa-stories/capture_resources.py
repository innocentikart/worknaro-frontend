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
PORT = 9371
OUT = Path(__file__).resolve().parent / "resources-guides-qa.png"
PROFILE = Path(__file__).resolve().parent / f".chrome-profile-res-{os.getpid()}"


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
            "--hide-scrollbars",
            "--window-size=1440,1000",
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
        send("Page.navigate", {"url": "http://127.0.0.1:3000/?v=guides1"})
        time.sleep(8)
        for _ in range(10):
            val = send(
                "Runtime.evaluate",
                {
                    "expression": """(() => {
                      document.documentElement.classList.remove('dark');
                      const el = document.getElementById('resources-heading');
                      if (!el) return {ok:false};
                      el.scrollIntoView({block:'center'});
                      const cards = [...document.querySelectorAll('.resources-card')];
                      const guides = cards[2];
                      const img = guides?.querySelector('img');
                      return {
                        ok: !!guides,
                        cards: cards.length,
                        imgSrc: img?.currentSrc || img?.src || null,
                        imgW: img?.naturalWidth || 0,
                        imgH: img?.naturalHeight || 0,
                        mediaH: guides?.querySelector('.resources-media')?.getBoundingClientRect().height || 0
                      };
                    })()""",
                    "returnByValue": True,
                },
            )
            print("prep", val.get("result", {}).get("value"))
            if val.get("result", {}).get("value", {}).get("ok"):
                break
            time.sleep(1)
        time.sleep(0.8)
        shot = send("Page.captureScreenshot", {"format": "png", "fromSurface": True}, timeout=90)
        OUT.write_bytes(base64.b64decode(shot["data"]))
        print("wrote", OUT, OUT.stat().st_size)
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
