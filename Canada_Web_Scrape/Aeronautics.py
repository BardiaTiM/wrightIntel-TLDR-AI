import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://laws-lois.justice.gc.ca/eng/acts/A-2/FullText.html'

driver.get(url)

t.sleep(2)

html = driver.find_element(By.XPATH, '//div[@class="wb-txthl wb-init wb-txthl-inited"]')
t.sleep(2)
html = html.text

# open a new file in write mode
with open("Aeronautics.txt", "w") as file:
    # write data to the file
    file.write(html)

driver.quit()
