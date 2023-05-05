import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.flyporter.com/en/travel-information/travel-disruptions'

driver.get(url)

t.sleep(2)

elements = []


def get_html(href, xpath):
    driver.find_element(By.XPATH, href).click()
    t.sleep(2)
    html = driver.find_element(By.XPATH, xpath).text
    elements.append(html)
    driver.back()


for i in range(3):
    if i == 0:
        t.sleep(10)
        get_html('//a[@href="/en/travel-information/travel-disruptions/delayed-diverted-and-cancelled-flights"]',
                 '//div[@class="unsupported-browser-overlay-container"]')
    elif i == 1:
        get_html('//a[@href="/en/travel-information/travel-disruptions/denied-boarding"]',
                 '//div[@class="unsupported-browser-overlay-container"]')


text = ""

for element in elements:
    text += element + "\n"

print(text)

driver.quit()
