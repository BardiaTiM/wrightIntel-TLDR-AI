import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.catsa-acsta.gc.ca/en'

driver.get(url)

t.sleep(2)

elements = []


def get_html(href, xpath):
    driver.find_element(By.XPATH, href).click()
    t.sleep(2)
    html = driver.find_element(By.XPATH, xpath).text
    elements.append(html)
    driver.back()


for i in range(5):
    if i == 0:
        get_html('//a[@data-entity-uuid="f992bbdc-87f3-411b-8883-a23f046cd1ae"]',
                 '//main[@class="col-md-9 main-container container js-quickedit-main-content"]')
    elif i == 1:
        get_html('//a[@data-entity-uuid="187a3129-e32e-43c8-8c69-4938c37ab174"]',
                 '//main[@class="col-md-9 main-container container js-quickedit-main-content"]')
    elif i == 2:
        get_html('//a[@data-entity-uuid="1d482a9f-0c05-4819-9c89-8c62f7214aa4"]',
                 '//main[@class="col-md-9 main-container container js-quickedit-main-content"]')
    elif i == 3:
        get_html('//a[@data-entity-uuid="1dbc9a63-a3a0-4f65-a655-efb716c985c8"]',
                 '//main[@class="col-md-9 main-container container js-quickedit-main-content"]')

text = ""

for element in elements:
    text += element + "\n"

print(text)

driver.quit()
