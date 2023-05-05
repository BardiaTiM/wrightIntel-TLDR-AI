from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"
chrome_service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=chrome_service)
url = 'https://www.jetblue.com/customer-assurance/customer-service-plan'

driver.get(url)

# Wait for the "Accept all cookies" button to be visible and click it
try:
    accept_cookies_button = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, '//button[text()="Accept all cookies"]'))
    )
    accept_cookies_button.click()
except Exception as e:
    print("Error: Couldn't find or click 'Accept all cookies' button. Continuing without clicking.")
    print(e)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
content = soup.find('div', {'class': 'w-100 ng-star-inserted'})

if content:
    text = content.get_text()
    print(text)
else:
    print("Div not found")

driver.quit()
print('Scraping complete.')
