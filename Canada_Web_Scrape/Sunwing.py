import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.sunwing.ca/en/sunwing-airlines/passenger-care'

driver.get(url)

t.sleep(2)

elements = []


def get_html(href, xpath):
    driver.find_element(By.XPATH, href).click()
    t.sleep(2)
    html = driver.find_element(By.XPATH, xpath).text
    elements.append(html)
    driver.refresh()


for i in range(3):
    if i == 0:
        get_html('//a[@aria-controls="1"]',
                 '//div[@accordion-section="panel"]')
    elif i == 1:
        get_html('//a[@aria-controls="2"]',
                 '//div[@accordion-section="panel"]')
    elif i == 2:
        get_html('//a[@aria-controls="3"]',
                 '//div[@accordion-section="panel"]')

text = ""

for element in elements:
    text += element + "\n"

with open("Sunwing.txt", "w") as file:
    file.write(text)

driver.quit()
