import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://www.aircanada.com/ca/en/aco/home/legal.html#/'

driver.get(url)

t.sleep(2)

elements = []


def get_html(link_text, xpath):
    driver.find_element(By.LINK_TEXT, link_text).click()
    t.sleep(2)
    html = driver.find_element(By.XPATH, xpath).text
    elements.append(html)
    driver.back()


for i in range(5):
    if i == 0:
        get_html("General Condition of Carriage",
                 '//div[@class="section-content col-lg-9 col-md-9 col-sm-9 col-xs-12"]')
    elif i == 1:
        get_html("Air Canada Privacy Policy", '//div[@class="narrow"]')
    elif i == 2:
        get_html("Terms of Use", '//div[@class="section-content col-lg-9 col-md-9 col-sm-9 col-xs-12"]')
    elif i == 3:
        get_html("Baggage Fees and Optional Services", '//div[@class="clearfix form-group"]')
    elif i == 4:
        get_html("Contingency plan for lengthy tarmac delays at Chinese airports",
                 '//div[@class="clearfix form-group"]')
    elif i == 5:
        get_html("Trademarks", '//div[@class="section-content col-lg-9 col-md-9 col-sm-9 col-xs-12"]')

text = ""

for element in elements:
    text += element + "\n"

print(text)

driver.quit()
