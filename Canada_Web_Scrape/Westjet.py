import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.westjet.com/en-ca/interruptions/canadian-passenger-rights'

driver.get(url)

t.sleep(2)

elements = []
buttons = []


def get_html(link_text, xpath):
    driver.find_element(By.XPATH, link_text).click()
    t.sleep(2)
    html = driver.find_element(By.XPATH, xpath).text
    elements.append(html)
    driver.back()


for i in range(3):
    if i == 0:
        get_html('//a[@href="/en-ca/baggage/lost-delayed-damaged"]', '//div[@class="main no-overlap"]')
    elif i == 1:
        # copy and paste is needed
        get_html('//a[@href="/en-ca/interruptions/delays-cancellations-changes"]', '//div[@class="main no-overlap"]')
    elif i == 2:
        # copy and paste is needed
        get_html('//a[@href="/en-ca/interruptions/denied-boarding"]', '//div[@class="main no-overlap"]')

url = 'https://www.westjet.com/en-ca/interruptions'

driver.get(url)

t.sleep(2)

for i in range(3):
    if i == 0:
        # copy and paste is needed
        get_html('//a[@href="/en-ca/interruptions/eu-alternate-dispute"]',
                 '//div[@class="com-collapsible-content__content"]')
    elif i == 1:
        # copy and paste is needed
        get_html('//a[@href="/en-ca/interruptions/us-service-plan"]', '//div[@class="com-container__content"]')

text = ""

for elements in elements:
    text += elements + "\n"

with open("Westjet.txt", "w") as file:
    file.write(text)

driver.quit()
