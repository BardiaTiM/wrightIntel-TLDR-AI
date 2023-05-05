import requests
import pdfplumber

url = 'https://content.spirit.com/Shared/en-us/Documents/Contract_of_Carriage.pdf'
response = requests.get(url)
with open('Contract_of_Carriage.pdf', 'wb') as f:
    f.write(response.content)

with pdfplumber.open('Contract_of_Carriage.pdf') as pdf:
    num_pages = len(pdf.pages)

    for page_num in range(num_pages):
        page = pdf.pages[page_num]
        text = page.extract_text()
        print(text)
