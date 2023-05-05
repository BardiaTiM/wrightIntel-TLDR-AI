import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://flyflair.com/flexibility-policies'

driver.get(url)

t.sleep(2)

html = None

for i in range(3):
    if i == 0:
        html = driver.find_element(By.XPATH, '//div[@class="contents  "]').text
        driver.refresh()
    elif i == 1:
        url = 'https://flyflair.com/passenger-protection-regulations'
        driver.get(url)
        t.sleep(2)
        html += driver.find_element(By.XPATH, '//div[@class="contents  "]').text
        driver.refresh()
    elif i == 2:
        url = 'https://flyflair.com/conditions-g%C3%A9n%C3%A9rales-de-r%C3%A8servation'
        driver.get(url)
        t.sleep(2)
        html += driver.find_element(By.XPATH, '//div[@class="contents  "]').text

with open("Flair.txt", "w") as file:
    file.write(html)

driver.quit()
