import requests
from bs4 import BeautifulSoup

# Helper function that returns a pageData object
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
        "url": url,
        "label": label
    }


    # Fetch page content
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    myDiv = soup.find_all("div") 
    myDiv.reverse()              

    # Find the specific elements
    recall_type = soup.find("div", class_="h3", id="wb-cont-nav")
    date = soup.find("time", attrs={"property": "dateModified"})
    title = soup.find("h1", class_="gc-thickline", id="wb-cont")
    product = soup.find("div", class_="field field--name-field-product field--type-string field--label-hidden field--item")
    issue = soup.find("div", class_="field field--name-field-issue-type field--type-entity-reference field--label-hidden field--items")
    wtd = soup.find("div", class_="field field--name-field-action field--type-text-long field--label-hidden field--item")
    audience = soup.find("div", class_="field field--name-field-who-this-is-for field--type-entity-reference field--label-hidden field--items")
    distribution = soup.find("div", class_="field field--name-field-distribution-region field--type-entity-reference field--label-hidden field--items")
    id = soup.find_all("div", class_="field field--name-node-id field--label-inline")
    id = id[-1]

    # Write each element if available
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
        # Case for transport recalls
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

