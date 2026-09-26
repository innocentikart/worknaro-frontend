import urllib.request
import re

html = urllib.request.urlopen("http://127.0.0.1:3000/?v=scale2", timeout=15).read().decode(
    "utf-8", "replace"
)
hrefs = re.findall(r'href="([^"]+\.css[^"]*)"', html)
for h in hrefs:
    url = h if h.startswith("http") else "http://127.0.0.1:3000" + h
    css = urllib.request.urlopen(url, timeout=15).read().decode("utf-8", "replace")
    if "main-dashboard" not in css:
        continue
    for m in re.finditer(r"\.main-dashboard\s*\{[^}]+\}", css):
        print("MAIN", " ".join(m.group(0).split())[:260])
        print("---")
    for m in re.finditer(r"\.hero-visual\s*\{[^}]+\}", css):
        print("VIS", " ".join(m.group(0).split())[:220])
        print("---")
    for m in re.finditer(
        r"@media \(min-width: 1024px\)\s*\{[^}]{0,80}\.main-dashboard\s*\{[^}]+\}", css
    ):
        print("MQ1024", " ".join(m.group(0).split())[:300])
    for m in re.finditer(
        r"@media \(min-width: 1280px\)\s*\{[^}]{0,80}\.main-dashboard\s*\{[^}]+\}", css
    ):
        print("MQ1280", " ".join(m.group(0).split())[:300])
