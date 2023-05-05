import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://laws.justice.gc.ca/eng/regulations/SOR-2019-150/page-1.html'

driver.get(url)

page_contents = []

t.sleep(2)

i = 0
while True:
    html = driver.find_element(By.XPATH, '//div[@class="wb-txthl wb-init wb-txthl-inited"]')
    t.sleep(2)
    html = html.text
    page_contents.append(html)
    driver.find_element(By.XPATH, '//a[@rel="next"]').click()
    t.sleep(2)
    i = i + 1
    if i == 4:
        break

text = ""

for page_content in page_contents:
    text = text + page_content + "\n"

with open("Protection.txt", "w") as file:
    file.write(text)


driver.quit()
