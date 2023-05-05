from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
#import unicodedata

chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"
chrome_service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=chrome_service)
url = "https://www.allegiantair.com/customer-service-plan"

driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
content = soup.find('div', {'class': 'field-items'})

if content:
    text = content.get_text()
    #normalized_text = unicodedata.normalize('NFKD', text)
    #cleaned_text = normalized_text.replace('§', '').replace('–', '-')
    #cleaned_text = cleaned_text[:cleaned_text.find(unwanted_text)]  #Remove unwanted text and everything after it
    print(text)
else:
    print("Div not found")

driver.quit()
print('Scraping complete.')
