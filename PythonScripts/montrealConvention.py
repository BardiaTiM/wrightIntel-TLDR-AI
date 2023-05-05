import requests
import pdfplumber

url = 'https://www.iata.org/contentassets/fb1137ff561a4819a2d38f3db7308758/mc99-full-text.pdf'
response = requests.get(url)
with open('montrealConvention.pdf', 'wb') as f:
    f.write(response.content)

with pdfplumber.open('montrealConvention.pdf') as pdf:
    num_pages = len(pdf.pages)

    for page_num in range(num_pages):
        page = pdf.pages[page_num]
        text = page.extract_text()
        print(text)
