import base64
import json
import os
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

import websocket
from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9363
DIR = Path(__file__).resolve().parent
OUT = DIR / "how-qa-desktop.png"
OUT_DARK = DIR / "how-qa-dark.png"
OUT_MOBILE = DIR / "how-qa-mobile.png"
PROFILE = DIR / f".chrome-profile-qa-{os.getpid()}"


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

        def eval_js(expression):
            return send(
                "Runtime.evaluate",
                {"expression": expression, "returnByValue": True, "awaitPromise": True},
            ).get("result", {}).get("value")

        def shot(path: Path):
            result = send("Page.captureScreenshot", {"format": "png", "fromSurface": True}, timeout=90)
            path.write_bytes(base64.b64decode(result["data"]))
            print(f"wrote {path} bytes={path.stat().st_size}")

        def prepare(theme="light", width=None):
            if width:
                send(
                    "Emulation.setDeviceMetricsOverride",
                    {
                        "width": width,
                        "height": 900 if width < 800 else 1000,
                        "deviceScaleFactor": 1,
                        "mobile": width < 800,
                    },
                )
            theme_js = (
                "document.documentElement.classList.add('dark'); localStorage.setItem('theme','dark');"
                if theme == "dark"
                else "document.documentElement.classList.remove('dark'); localStorage.setItem('theme','light');"
            )
            for _ in range(15):
                val = eval_js(
                    f"""(() => {{
                      {theme_js}
                      const section = document.querySelector('.how-section');
                      if (!section) return {{ok:false}};
                      section.scrollIntoView({{block:'center', inline:'nearest'}});
                      const r = section.getBoundingClientRect();
                      const inView = r.top < window.innerHeight && r.bottom > 80;
                      const cards = [...document.querySelectorAll('.how-card')].map(el => {{
                        const b = el.getBoundingClientRect();
                        return {{cx: b.left + b.width/2, top: b.top, h: b.height}};
                      }});
                      const nodes = [...document.querySelectorAll('.how-timeline .how-timeline-node')].map(el => {{
                        const b = el.getBoundingClientRect();
                        return {{cx: b.left + b.width/2, cy: b.top + b.height/2, visible: getComputedStyle(el).display !== 'none'}};
                      }});
                      const mobileNodes = [...document.querySelectorAll('.how-timeline-mobile .how-timeline-node')].length;
                      const tl = document.querySelector('.how-timeline');
                      const tm = document.querySelector('.how-timeline-mobile');
                      const line = document.querySelector('.how-timeline-line');
                      const lr = line ? line.getBoundingClientRect() : null;
                      return {{
                        ok: inView && cards.length === 4,
                        inView,
                        top: Math.round(r.top),
                        bottom: Math.round(r.bottom),
                        vh: window.innerHeight,
                        vw: window.innerWidth,
                        cardTops: cards.map(c => Math.round(c.top)),
                        cardHeights: cards.map(c => Math.round(c.h)),
                        centerDiffs: cards.map((c,i) => nodes[i] ? Math.round(Math.abs(c.cx - nodes[i].cx)*10)/10 : null),
                        hDisplay: tl ? getComputedStyle(tl).display : null,
                        mDisplay: tm ? getComputedStyle(tm).display : null,
                        mobileNodes,
                        lineSpan: lr ? [Math.round(lr.left), Math.round(lr.right)] : null,
                        firstNode: nodes[0] ? Math.round(nodes[0].cx) : null,
                        lastNode: nodes[3] ? Math.round(nodes[3].cx) : null,
                        heading: (document.getElementById('how-heading')||{{}}).innerText || ''
                      }};
                    }})()"""
                )
                print("prep", val)
                if val and val.get("ok"):
                    return val
                time.sleep(0.8)
            return val

        send("Page.enable")
        send("Runtime.enable")
        send("Page.navigate", {"url": "http://127.0.0.1:3000/?v=how-qa-final"})
        time.sleep(8)

        light = prepare("light")
        time.sleep(0.5)
        shot(OUT)

        dark = prepare("dark")
        time.sleep(0.5)
        shot(OUT_DARK)

        mobile = prepare("light", width=390)
        time.sleep(0.5)
        shot(OUT_MOBILE)

        # Crop desktop to section band using measured tops
        if light and light.get("ok"):
            im = Image.open(OUT).convert("RGB")
            # find blue icon pixels for crop
            hits = []
            for y in range(0, im.size[1], 2):
                for x in range(40, 280, 4):
                    r, g, b = im.getpixel((x, y))
                    if 40 < r < 120 and 70 < g < 150 and 200 < b < 255:
                        hits.append(y)
                        break
                if len(hits) > 12:
                    break
            y0 = max(0, (hits[0] - 140) if hits else 80)
            y1 = min(im.size[1], y0 + 720)
            crop = im.crop((0, y0, im.size[0], y1))
            crop_path = DIR / "how-qa-desktop-crop.png"
            crop.save(crop_path)
            print("crop", crop_path, "from", y0, "hits", hits[:5])

        ws.close()
        print("DONE", {"light": light, "dark": dark, "mobile": mobile})
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)


if __name__ == "__main__":
    main()
