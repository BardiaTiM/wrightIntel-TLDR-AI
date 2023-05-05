from bs4 import BeautifulSoup # Import the BeautifulSoup module for HTML parsing
import time  # Import the time module for sleeping
from selenium import webdriver # Import the selenium webdriver module
from selenium.webdriver.common.by import By # Import the By class for locating elements
from selenium.webdriver.chrome.service import Service # Import the Service class for configuring the browser
from selenium.webdriver.support.ui import WebDriverWait # Import the WebDriverWait class for waiting for elements
from selenium.webdriver.support import expected_conditions as EC # Import the expected_conditions module for defining expected conditions
import unicodedata

#Set the path to the ChromeDriver executable
chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"

#Create a Service object with the ChromeDriver path
chrome_service = Service(executable_path=chrome_driver_path)

#Create a Chrome webdriver object with the Service configuration
driver = webdriver.Chrome(service=chrome_service)

#Set the URL to be scraped
url = "https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-250"

#Navigate to the URL
driver.get(url)

#Step 3: Allow time for JavaScript to load the content
time.sleep(5)

#Step 4: Get the HTML content of the loaded webpage
html = driver.page_source

#Step 5: Parse the content using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

#Step 6: Find the target div using its class name
content_block = soup.find('div', {'class': 'part'})

#Step 7: Extract the text from the div
if content_block:
    text = content_block.get_text()
    
    #Normalize the Unicode characters in the text
    normalized_text = unicodedata.normalize('NFKD', text)
    
      # Remove the "§" character and replace the long dash "–" with a regular hyphen "-"
    cleaned_text = normalized_text.replace('§', '').replace('–', '-')
    print(text)
else:
    print("Div not found")

#Step 8: Close the browser
driver.quit()
print("Browser closed - Scraping complete")