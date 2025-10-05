from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time, random
import utils

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

supabase = create_client(url, key)
existing = supabase.table("Page_Data").select("link").execute()
existing_links = {row["link"] for row in existing.data} if existing.data else set()
print(f"✅ Found {len(existing_links)} existing links in database")

BASE_URL = "https://recalls-rappels.canada.ca/en?page=%2C"

def get_hyperlinks(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    for block in soup.select("div.homepage-recent-row"):
        try:
            a_tag = block.select_one("span.homepage-recent a")
            img_tag = block.select_one("div.views-field-field-recall-type img")
            if not a_tag or not img_tag:
                continue

            href = urljoin(url, a_tag.get("href"))
            svg_src = img_tag.get("src")
            label = svg_src.split("icon-")[-1].replace(".svg", "") if svg_src else None

            # Skip if already inserted
            if href in existing_links:
                print(f"⏭️ Skipping existing link: {href}")
                continue

            # Otherwise scrape and insert
            record = utils.fillObject(href, label)
            res = supabase.table("Page_Data").insert([record]).execute()

            if res.data:
                existing_links.add(href)  # add it so we don't reinsert later
                print(f"✅ Inserted new recall: {href}")
            else:
                print(f"⚠️ Insert failed for {href}: {res.error_message}")

            # Be polite to the server
            time.sleep(random.uniform(1.0, 1.5))

        except Exception as e:
            print(f"❌ Error scraping {href}: {e}")



for page in range(0, 20):
    url = f"https://recalls-rappels.canada.ca/en?page=%2C{page}"
    try:
        get_hyperlinks(url)
        print(f"[✅ Completed Page {page}]")
    except Exception as e:
        print(f"[⚠️ Error on page {page}: {e}]")





