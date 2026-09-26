import urllib.request
import re
import time

html = urllib.request.urlopen("http://127.0.0.1:3000/?v=ba3", timeout=15).read().decode(
    "utf-8", "replace"
)
hrefs = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print("css", len(hrefs))
for h in hrefs:
    url = h if h.startswith("http") else "http://127.0.0.1:3000" + h
    try:
        css = urllib.request.urlopen(url, timeout=15).read().decode("utf-8", "replace")
    except Exception as e:
        print("fail", h, e)
        continue
    if "projects-dashboard" not in css:
        continue
    for m in re.finditer(r"\.projects-dashboard\s*\{[^}]+\}", css):
        rule = " ".join(m.group(0).split())
        if "width" in rule or "align-self" in rule or "bottom" in rule or "position" in rule:
            print(rule[:300])
            print("---")
