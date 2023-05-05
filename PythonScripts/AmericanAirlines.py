from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

chrome_driver_path = "C:\ExecutableBrowserFiles\chromedriver_win32\chromedriver.exe"
chrome_service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=chrome_service)
url = "https://www.aa.com/i18n/customer-service/support/customer-service-plan.jsp"

driver.get(url)

div_ids = ['customerserviceplan', 'accomodation', 'baggagedelivery', 'baggageliability', 'checkin', 'customerloyalt', 'delays', 'familyseating', 'flightwithoversales', 'lowestfareavailability', 'guaranteedfares', 'othertravelpolicies']

content_dict = {}

for div_id in div_ids:
    toggle_selector = f"#{div_id} a.collapsible-toggle"
    collapsible_element = driver.find_element_by_css_selector(toggle_selector)
    collapsible_element.click()

    import time
    time.sleep(2)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    expanded_div = soup.find('div', {'id': div_id})

    content_lines = []

    for tag in expanded_div.find_all(['p', 'li']):
        content = tag.get_text(strip=True)
        if content:
            content_lines.append("- " + content.replace("\n", " ").replace("•", "-"))

    content_dict[div_id] = content_lines

    print(f"Content for div id '{div_id}':")
    print("\n".join(content_lines))
    print("\n---\n")

driver.quit()
