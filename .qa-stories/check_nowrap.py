import urllib.request
import re

html = urllib.request.urlopen("http://127.0.0.1:3000/?v=nw3", timeout=15).read().decode(
    "utf-8", "replace"
)
hrefs = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print("css files", len(hrefs))
for h in hrefs:
    url = h if h.startswith("http") else "http://127.0.0.1:3000" + h
    css = urllib.request.urlopen(url, timeout=15).read().decode("utf-8", "replace")
    if "hero-feature-title" not in css:
        continue
    for m in re.finditer(r"\.hero-feature-title\s*\{[^}]+\}", css):
        print("TITLE", " ".join(m.group(0).split()))
    for m in re.finditer(r"\.hero-features\s*\{[^}]+\}", css):
        print("FEATURES", " ".join(m.group(0).split())[:220])
    for m in re.finditer(r"@media \(min-width: 900px\)\s*\{\s*\.hero-features\s*\{[^}]+\}", css):
        print("MQ", " ".join(m.group(0).split())[:300])
