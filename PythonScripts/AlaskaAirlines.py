import time
import undetected_chromedriver as uc  # Import undetected_chromedriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

chrome_driver_path = "/path/to/chromedriver"

options = uc.ChromeOptions()
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36")

# Initialize the WebDriver with undetected_chromedriver
driver = uc.Chrome(executable_path=chrome_driver_path, options=options)

#url links to scrape through
urls = [
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-overview',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-lowest-fare',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-rules-disclosure',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-flexibility',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-process-refund',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-clean-aircraft',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-special-needs',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-family-seating',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-delay-choices',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-delay-care',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-extended-delays',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-overbooked-flights',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-baggage-return',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-mileage-value',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-partnerships',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-schedule-changes',
    'https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-listen-to-you'
]

# Iterate through each URL in the list
for i, url in enumerate(urls):
    driver.get(url)  # Navigate to the URL

    # Wait for the presence of the h1 element to ensure the page has loaded
    WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, "//h1")))
    # Parse the page source with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, "html.parser")
    # Find the main content div using the specified class
    main_content = soup.find("div", class_="col-sm-8 col-sm-push-4")

    # Write the main content to a file
    with open(f"content_{i+1}.txt", "w", encoding="utf-8") as file:
        file.write(str(main_content))

    time.sleep(5)  # Add a 5-second delay between requests to avoid overloading the server

driver.quit()  # Close the WebDriver and release resources

