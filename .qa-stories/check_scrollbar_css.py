import urllib.request
import re

html = urllib.request.urlopen("http://127.0.0.1:3000/", timeout=25).read().decode("utf-8", "replace")
links = re.findall(r"/_next/static/chunks/[^\"']+\.css", html)
print("css links", len(set(links)))
found = False
for u in sorted(set(links)):
    try:
        css = urllib.request.urlopen("http://127.0.0.1:3000" + u, timeout=15).read().decode("utf-8", "replace")
    except Exception as e:
        print("err", u, e)
        continue
    if "scrollbar" in css or "webkit-scrollbar" in css:
        found = True
        print("FOUND", u, "count", css.count("scrollbar"))
print("any", found)
