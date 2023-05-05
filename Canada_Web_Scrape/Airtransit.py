import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.airtransat.com/en-CA/travel-information/customer-service/disruptions-recourses'

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
        # copy and paste is the best way to get the text from the website
        get_html('//a[@href="/en-CA/Travel-information/Customer-service/Disruptions-Recourses/Flight-disruption-delay"]',
                 '//div[@class="TS-mainContent"]')
    elif i == 1:
        # copy and paste is the best way to get the text from the website
        get_html('//a[@href="/en-CA/Travel-information/Customer-service/Disruptions-Recourses/Baggages"]',
                 '//div[@class="TS-mainContent"]')
    elif i == 2:
        # copy and paste is the best way to get the text from the website
        get_html('//a[@href="/en-CA/Travel-information/Customer-service/Disruptions-Recourses/Denied-boarding"]',
                 '//div[@class="TS-mainContent"]')

url = 'https://www.airtransat.com/en-CA/Legal-notice/General-Terms-and-Conditions'

driver.get(url)

t.sleep(2)

html = driver.find_element(By.XPATH, '//div[@class="TS-mainContent"]').text

elements.append(html)

text = ""

for element in elements:
    text += element + "\n"

# open a new file in write mode
with open("Airtransit.txt", "w") as file:
    # write data to the file
    file.write(text)

driver.quit()
