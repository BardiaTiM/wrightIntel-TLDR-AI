import requests
import pdfplumber

url = 'https://www.afklcargo.com/WW/common/common/pdf/Warsaw_Convention.pdf'
response = requests.get(url)
with open('warsawConvention.pdf', 'wb') as f:
    f.write(response.content)

with pdfplumber.open('warsawConvention.pdf') as pdf:
    num_pages = len(pdf.pages)

    for page_num in range(num_pages):
        page = pdf.pages[page_num]
        text = page.extract_text()
        print(text)
