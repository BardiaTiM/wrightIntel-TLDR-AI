from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import nltk

nltk.download('punkt')

chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"
chrome_service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=chrome_service)
url = "https://www.allegiantair.com/customer-service-plan"

driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
content = soup.find('div', {'class': 'field-items'})

categories = {
    "General information, fares, purchases, delays and cancellations": [],
    "Providing prompt ticket refunds": [],
    "Properly accommodating passenger with disabilities and other special needs, including during tarmac delays": [],
    "Meeting customers' essential needs during lengthy tarmac delays (Contingency Plan)": [],
    'Handling "bumped" passengers with fairness and consistency in case of an overbooked flight': [],
    "Travel Itinerary:":[],
    "Passenger Cancellations:":[],
    "Aircraft Configuration:":[],
    "Ensuring responsiveness to customer complaints": []
}

if content:
    text = content.get_text()
    lines = text.split('\n')
    current_category = None
    for line in lines:
        line = line.strip()
        for category in categories:
            if line.lower().startswith(category.lower()):
                current_category = category
                break
        if current_category:
            if line != current_category:
                sentences = nltk.sent_tokenize(line)
                for sentence in sentences:
                    categories[current_category].append(f"- {sentence}\n")

    for category, lines in categories.items():
        print(f"{category}:")
        print("\n".join(lines))
        print("\n---\n")
else:
    print("Div not found")

driver.quit()
print('Scraping complete.')
