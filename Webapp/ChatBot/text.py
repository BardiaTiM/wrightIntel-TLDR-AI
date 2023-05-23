import requests
from datetime import datetime

api_key = 'TaGGXjzKCpT0cZ1dxthulOliuG4zdQrC'
api_url = 'https://aeroapi.flightaware.com/aeroapi/'

flight_id = 'AC5291'
auth_header = {'x-apikey': api_key}

response = requests.get(api_url + f'flights/{flight_id}', headers=auth_header)

if response.status_code == 200:
    flight_data = response.json()
    print(flight_data)
else:
    print('Error executing request')
