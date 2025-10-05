import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time, random

url = "https://recalls-rappels.canada.ca/en?page=%2C"
resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(resp.text, "html.parser")

# find all <a> tags inside span.homepage-recent
links = []
# for i in range(0,20):
#     page = url + str(i)
#     for a in soup.select("span.homepage-recent a"):
#         href = a.get("href")
#         full_url = urljoin(page, href)  # make absolute URL
#         links.append(full_url)
#     time.sleep(random.uniform(1.5, 3.5))

data = []
for span in soup.select("span.homepage-recent"):
    a_tag = span.find("a")
    if not a_tag:
        continue

    href = urljoin(BASE_URL, a_tag.get("href"))
    hreflang = a_tag.get("hreflang")
    title = a_tag.get_text(strip=True)

    # Find the span with recall info and date
    recall_info = span.select_one("span.ar-type")
    recall_text = recall_info.get_text(strip=True) if recall_info else None

    data.append({
        "title": title,
        "href": href,
        "hreflang": hreflang,
        "recall_info": recall_text
    })

for item in data:
    print(item)

print(len(links))