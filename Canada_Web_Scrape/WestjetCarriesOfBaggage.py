import pdfplumber

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

pdf_path = "\Downloads\WestJet Domestic Tariff (1).pdf"
pdf_text = extract_text_from_pdf(pdf_path)

print("Extracted Text:")
print(pdf_text)