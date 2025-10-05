from dotenv import load_dotenv
load_dotenv()
import os
from supabase import create_client
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time, random

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

supabase = create_client(url, key)
existing = supabase.table("Page_Data").select("link").execute()
existing_links = {row["link"] for row in existing.data} if existing.data else set()
print(f"✅ Found {len(existing_links)} existing links in database")

BASE_URL = "https://recalls-rappels.canada.ca/en?page=%2C"

def fillObject(url, label):   
    pageData = {
        "id": "",
        "recall_type": "",
        "date": "",
        "title": "",
        "product": "",
        "issue": "",
        "wtd": "",
        "audience": "",
        "distribution": "",
        "link": url,
        "label": label
    }

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    recall_type = soup.find("div", class_="h3", id="wb-cont-nav")
    date = soup.find("time", attrs={"property": "dateModified"})
    title = soup.find("h1", class_="gc-thickline", id="wb-cont")
    product = soup.find("div", class_="field field--name-field-product field--type-string field--label-hidden field--item")
    issue = soup.find("div", class_="field field--name-field-issue-type field--type-entity-reference field--label-hidden field--items")
    wtd = soup.find("div", class_="field field--name-field-action field--type-text-long field--label-hidden field--item")
    audience = soup.find("div", class_="field field--name-field-who-this-is-for field--type-entity-reference field--label-hidden field--items")
    distribution = soup.find("div", class_="field field--name-field-distribution-region field--type-entity-reference field--label-hidden field--items")
    id = soup.find_all("div", class_="field field--name-node-id field--label-inline")
    id = id[-1] if id else None

    if title:
        pageData["title"] = title.get_text(strip=True)
    if product:
        pageData["product"] = product.get_text(strip=True)
    if issue:
        pageData["issue"] = issue.get_text(strip=True)
    if recall_type:
        pageData["recall_type"] = recall_type.get_text(strip=True)
    if date:
        pageData["date"] = date.get_text(strip=True)

    if wtd:
        temp = wtd.get_text(strip=False)
        if temp == "Please see corrective actions section below":
            car = soup.find(
                "div",
                class_="field field--name-field-issue-long field--type-text-long field--label-hidden field--item"
            )
            if car:
                car_text = car.get_text(strip=False)
                if "Corrective Actions:" in car_text:
                    temp = car_text.split("Corrective Actions:")[1].strip()
                elif "Corrective Action:" in car_text:
                    temp = car_text.split("Corrective Action:")[1].strip()
                else:
                    temp = car_text.strip()
        pageData["wtd"] = temp

    if distribution:
        pageData["distribution"] = distribution.get_text(strip=True)
    else:
        pageData["distribution"] = "National"

    if audience:
        pageData["audience"] = audience.get_text(strip=True)

    if id:
        text = id.get_text(strip=True)
        value = text.replace("Identification number", "").strip()
        pageData["id"] = value

    return pageData

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
            record = fillObject(href, label)
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





