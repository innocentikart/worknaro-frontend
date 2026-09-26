import re
import urllib.request

html = urllib.request.urlopen("http://127.0.0.1:3000/", timeout=60).read().decode(
    "utf-8", "replace"
)
print("css links", re.findall(r'href="([^"]+\.css)"', html)[:10])
print("gear in html/css blob", "appearance-gear-spin" in html)
print("feather-sun before rule", "feather-sun:before" in html or ".feather-sun" in html)
# turbopack may use different asset URLs
for pat in [r'/_next/[^"\']+', r'static/chunks/[^"\']+\.css']:
    hits = re.findall(pat, html)
    print(pat, "hits", len(hits), "sample", hits[:5])

# Check compiled globals in .next
from pathlib import Path
root = Path(r"c:\Work\Hannah\Project Manager\organitio\frontend\.next")
matches = []
for p in root.rglob("*.css"):
    try:
        t = p.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        continue
    if "appearance-gear-spin" in t or "theme-switcher" in t:
        matches.append(str(p))
print("next css matches", len(matches))
for m in matches[:8]:
    print(" ", m)
