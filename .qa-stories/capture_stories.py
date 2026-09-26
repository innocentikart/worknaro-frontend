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
PORT = 9343
OUT = Path(__file__).resolve().parent / "stories-section-live.png"
PROFILE = Path(__file__).resolve().parent / f".chrome-profile-{os.getpid()}"


def get_json(path: str):
    with urllib.request.urlopen(f"http://127.0.0.1:{PORT}{path}", timeout=5) as r:
        return json.loads(r.read().decode("utf-8"))


def wait_targets(timeout=20):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            pages = get_json("/json/list")
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
            "--window-size=1440,1200",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        pages = wait_targets()
        ws = websocket.create_connection(pages[0]["webSocketDebuggerUrl"], timeout=60)
        ws.settimeout(60)
        msg_id = 0

        def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            current = msg_id
            ws.send(json.dumps({"id": current, "method": method, "params": params or {}}))
            deadline = time.time() + 60
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
        nav = send("Page.navigate", {"url": "http://127.0.0.1:3000/"})
        print("nav", nav)
        time.sleep(8)

        for _ in range(8):
            found = send(
                "Runtime.evaluate",
                {
                    "expression": "(() => { const el = document.getElementById('stories-heading'); if (!el) return {ok:false, ready:document.readyState}; el.scrollIntoView({block:'center'}); return {ok:true, y: window.scrollY}; })()",
                    "returnByValue": True,
                },
            )
            print("found", found)
            if found.get("result", {}).get("value", {}).get("ok"):
                break
            time.sleep(1.5)

        time.sleep(1.0)
        result = send("Page.captureScreenshot", {"format": "png", "fromSurface": True})
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
