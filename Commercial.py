import time as t
from selenium import webdriver
from selenium.webdriver.common.by import By


chrome_driver_path = '/Users/jinhobaek/chromedriver'
driver = webdriver.Chrome(chrome_driver_path)
url = 'https://laws-lois.justice.gc.ca/eng/regulations/sor-96-433/page-80.html#h-997067'

driver.get(url)

page_contents = []

t.sleep(2)

i = 0
while True:
    if i == 0:
        html = driver.find_element(By.XPATH, '//dl[@class="Definition"]')
    else:
        html = driver.find_element(By.XPATH, '//div[@class="wb-txthl wb-init wb-txthl-inited"]')
    t.sleep(0.5)
    html = html.text
    page_contents.append(html)
    driver.find_element(By.XPATH, '//a[@rel="next"]').click()
    t.sleep(0.5)
    i = i + 1
    if i == 29:
        break

text = ""

for page_content in page_contents:
    text = text + page_content + "\n"

print(text)

driver.quit()