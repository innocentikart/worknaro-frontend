import re
import urllib.request

try:
    r = urllib.request.urlopen("http://127.0.0.1:3000/fonts/feather.woff", timeout=20)
    print("font", r.status, r.headers.get("content-type"), "len", len(r.read()))
except Exception as e:
    print("font err", e)

html = urllib.request.urlopen("http://127.0.0.1:3000/", timeout=60).read().decode(
    "utf-8", "replace"
)
css_urls = re.findall(r'href="(/_next/static/[^"]+\.css)"', html)
print("css count", len(css_urls))
found = False
for u in css_urls[:12]:
    try:
        css = urllib.request.urlopen("http://127.0.0.1:3000" + u, timeout=30).read().decode(
            "utf-8", "replace"
        )
        if "appearance-gear-spin" in css or "feather-sun" in css or "theme-switcher" in css:
            print(
                "found in",
                u,
                "spin",
                "appearance-gear-spin" in css,
                "sun",
                "feather-sun" in css,
                "theme-switcher",
                "theme-switcher" in css,
            )
            found = True
    except Exception as e:
        print("css err", u, e)
print("any", found)
print("html sun", "feather-sun" in html)
print("html settings", "feather-settings" in html)
print("html theme-switcher", "theme-switcher" in html)
