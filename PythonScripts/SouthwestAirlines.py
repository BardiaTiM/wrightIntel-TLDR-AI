import requests
import PyPDF2

url = 'https://www.southwest.com/assets/pdfs/corporate-commitments/customer-service-plan.pdf?clk=7396032'
response = requests.get(url)
with open('customer-service-plan.pdf', 'wb') as f:
    f.write(response.content)

# Use PdfReader instead of PdfFileReader
with open('customer-service-plan.pdf', 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    num_pages = len(reader.pages)  # Use len(reader.pages) instead of reader.numPages

    for page_num in range(num_pages):
        page = reader.pages[page_num]
        text = page.extract_text()
        print(text)

