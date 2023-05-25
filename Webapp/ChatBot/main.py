# Import necessary modules//
import os
import requests
import numpy as np
from datetime import date, timedelta
from dotenv import load_dotenv
from langchain import OpenAI
from llama_index import Document
from llama_index import GPTSimpleVectorIndex, LLMPredictor, ServiceContext
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify
from flask_cors import CORS

class AirlineChatBot:
    def __init__(self, directory_path):
        self.directory_path = directory_path
        self.indexes = {}

    def get_or_create_index(self, airline_name):
        if airline_name not in self.indexes:
            file_path = get_airline_file(airline_name, self.directory_path)
            if file_path is None:
                return None

            with open(file_path, "r", encoding='utf-8') as f:
                doc_text = f.read()

            num_outputs = 250  # Adjusted this value
            llm_predictor = LLMPredictor(llm=OpenAI(temperature=0.7, model_name="text-davinci-003", max_tokens=num_outputs))  # Adjusted the model name
            service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
            doc = Document(text=doc_text)
            index = GPTSimpleVectorIndex.from_documents([doc], service_context=service_context)
            directory_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "AirLineJson")
            filename = f"{airline_name}_index.json"
            file_path = os.path.join(directory_path, filename)
            index.save_to_disk(file_path)
            self.indexes[airline_name] = index
        return self.indexes[airline_name]

app = Flask(__name__)
CORS(app) 
# Load env ariables from .env file
load_dotenv()
api_key = os.getenv("API_SECRET_KEY")

# Set OpenAI API key as environment variable
os.environ["OPENAI_API_KEY"] = api_key

model = SentenceTransformer('paraphrase-distilroberta-base-v1')


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def get_airline_file(airline_name, directory_path):
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), directory_path)
    for file in os.listdir(path):
        if airline_name.lower() in file.lower():
            return os.path.join(path, file)
    return None



def is_related(airline_name, question, min_similarity=0.2):
    file_path = get_airline_file(airline_name, "Knowledge")
    if file_path is None:
        return False

    with open(file_path, "r", encoding='utf-8') as f:
        doc_text = f.read()

    question_embedding = model.encode([question])[0]
    doc_embedding = model.encode([doc_text])[0]
    similarity = cosine_similarity(question_embedding, doc_embedding)

    return similarity > min_similarity


chat_bot = AirlineChatBot("Knowledge")

def chatbot(airline_name, input_text):
    if input_text is None:
        return "Input text is missing or empty."

    input_text = input_text.strip()

    if input_text.lower() in ['hello', 'hi', 'hey']:
        return "Hello, I'm TLDR, the Airline Policy Expert. I can answer any questions you have about airline policies and laws."
    
    if is_related(airline_name, input_text):
        index = chat_bot.get_or_create_index(airline_name)
        response = index.query(input_text, response_mode="compact")
        return response.response
    else:
        return "I'm sorry, as an Airline Policy Expert, I don't have information outside of my training on airline regulations."




@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    airline_name = data.get('airline_name')
    input_text = data.get('input_text')
    response = chatbot(airline_name, input_text)
    return jsonify({'response': response}), 200, {'Access-Control-Allow-Origin': 'http://localhost:4056'}




api_key2 = os.getenv("FLIGHT_SECRET_KEY")
api_url = 'https://aeroapi.flightaware.com/aeroapi/'

@app.route('/flight_info', methods=['POST'])
def flight_info():
    data = request.get_json()
    flight_num = data.get('flight_num')
    auth_header = {'x-apikey': api_key2}  # Replace with your API key
    
    result = {}

    # Get flight data
    flight_response = requests.get(f"{api_url}/flights/{flight_num}", headers=auth_header)
    flight_data = flight_response.json()

    if flight_response.status_code == 200:
        flights = flight_data.get('flights')
        if flights:
            # Find the flight scheduled for today
            today = date.today().strftime("%Y-%m-%d")
            scheduled_flights = [flight for flight in flights if flight.get('scheduled_out')[:10] == today]
            60
            if scheduled_flights:
                scheduled_flight = scheduled_flights[0]
                operator_code = scheduled_flight.get('operator', None)  # Extract operator code
                flight_status = scheduled_flight.get('status', None)  # Extract flight status directly
                scheduled_time = scheduled_flight.get('scheduled_out', None)  # Extract scheduled time
                departure_delay = scheduled_flight.get('departure_delay', None)  # Extract departure delay in seconds
                
                # Get operator data
                if operator_code:
                    operator_response = requests.get(f"{api_url}/operators/{operator_code}", headers=auth_header)
                    if operator_response.status_code == 200:
                        operator_data = operator_response.json()
                        airline_name = operator_data.get('name', 'No operator data')  # Extract operator name
                    else:
                        airline_name = 'Operator data not available'
                else:
                    airline_name = 'No operator data'
                
                # Convert departure delay to hh:mm format
                if departure_delay is not None:
                    departure_delay = timedelta(seconds=departure_delay)
                    hours = departure_delay.seconds // 3600
                    minutes = (departure_delay.seconds % 3600) // 60
                    departure_delay_str = f"{hours:02d}:{minutes:02d}"
                else:
                    departure_delay_str = 'No departure delay data'
                
                # Add data to result
                result['airline_name'] = airline_name
                result['flight_status'] = flight_status if flight_status else 'No flight status data'
                result['scheduled_time'] = scheduled_time if scheduled_time else 'No scheduled time data'
                result['departure_delay'] = departure_delay_str
            else:
                result['airline_name'] = 'No flight data for today'
                result['flight_status'] = 'No flight data for today'
                result['scheduled_time'] = 'No flight data for today'
                result['departure_delay'] = 'No flight data for today'
        else:
            result['airline_name'] = 'No flight data'
            result['flight_status'] = 'No flight data'
            result['scheduled_time'] = 'No flight data'
            result['departure_delay'] = 'No flight data'
    else:
        result['airline_name'] = 'Data not available'
        result['flight_status'] = 'Data not available'
        result['scheduled_time'] = 'Data not available'
        result['departure_delay'] = 'Data not available'

    return jsonify(result), 200, {'Access-Control-Allow-Origin': 'http://localhost:4056'}








if __name__ == '__main__':
    app.run(port=5001, debug=True)
