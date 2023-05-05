# Import required libraries
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException
import time
from bs4 import BeautifulSoup
import unicodedata

# Define a function to click the "next" button
from selenium.webdriver.common.by import By

def click_next(driver):
    try:
        # Find the "next" button element using the link text
        next_button = driver.find_element(By.LINK_TEXT, "next")
        # Click the "next" button
        next_button.click()
        # Wait for 5 seconds to let the page load
        time.sleep(2)
        return True
    except NoSuchElementException:
        # If the "next" button is not found, return False
        return False


# Set the path for the ChromeDriver executable
chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"
# Create a Chrome service with the provided path
chrome_service = Service(executable_path=chrome_driver_path)
# Initialize a Chrome WebDriver instance using the created service
driver = webdriver.Chrome(service=chrome_service)
# Set the URL to scrape
url = "https://www.law.cornell.edu/cfr/text/14/259.1"
# Open the URL in the browser
driver.get(url)
# Wait for 5 seconds to let the page load
time.sleep(3)

# Start a loop that continues until there are no more "next" buttons
while True:
    # Get the page source code
    html = driver.page_source
    # Parse the source code using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    # Find the content div using the 'div8' class
    content = soup.find('div', {'class': 'div8'})

    # Check if the content div is found
    if content:
        # Get the text from the content div
        text = content.get_text()
        # Normalize the text using the NFKD form
        normalized_text = unicodedata.normalize('NFKD', text)
        # Replace unwanted characters in the text
        cleaned_text = normalized_text.replace('§', '').replace('–', '-')
        # Print the cleaned text
        print(cleaned_text)
    else:
        # If the content div is not found, print an error message
        print("Div not found")

    # Try to click the "next" button; break the loop if it's not found
    if not click_next(driver):
        break

# Close the browser
driver.quit()
# Print a message indicating that the scraping is complete
print("Browser closed - Scraping complete")
