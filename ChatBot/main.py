# Import necessary modules
from llama_index import SimpleDirectoryReader, GPTSimpleVectorIndex, LLMPredictor, ServiceContext
from langchain import OpenAI
import gradio as gr
import os
from sentence_transformers import SentenceTransformer
import numpy as np

# Set OpenAI API key as environment variable
os.environ["OPENAI_API_KEY"] = ''

# Initialize the sentence transformer model
model = SentenceTransformer('paraphrase-distilroberta-base-v1')

# Define a function to calculate cosine similarity
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Define a function to check whether the input question is related to the content in the PDF
def is_related(question, min_similarity=0.2):
    # Load the text documents from the specified directory
    docs = SimpleDirectoryReader("Knowledge").load_data()
    question_embedding = model.encode([question])[0]
    similarities = []

    for doc in docs:
        doc_embedding = model.encode([doc.text])[0]  # Change this line
        similarity = cosine_similarity(question_embedding, doc_embedding)
        similarities.append(similarity)

    max_similarity = max(similarities)
    return max_similarity > min_similarity

# Define a function to construct and save the GPT-based index
def construct_index(directory_path):
    num_outputs = 512 # Number of text tokens in GPT model output
    # Create a language model predictor using OpenAI's GPT model
    llm_predictor = LLMPredictor(llm=OpenAI(temperature=0.7, model_name="text-davinci-003", max_tokens=num_outputs))
    # Create a service context object for the GPT-based index
    service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
    # Load the text documents from the specified directory
    docs = SimpleDirectoryReader(directory_path).load_data()
    # Create a GPT-based vector index from the text documents
    index = GPTSimpleVectorIndex.from_documents(docs, service_context=service_context)
    # Save the index to disk
    index.save_to_disk('index.json')
    # Return the index object
    return index

# Modify the chatbot function to check if the input question is related
def chatbot(input_text):
    # Check if the input question is related to the content in the PDF
    if is_related(input_text):
        # Load the GPT-based index from disk
        index = GPTSimpleVectorIndex.load_from_disk('index.json')
        # Use the index to generate a response to the input text
        response = index.query(input_text, response_mode="compact")
        # Return the response text
        return response.response
    else:
        return "I'm sorry, I cannot answer questions unrelated to my knowledge base."

# Create a Gradio interface for the chatbot function
iface = gr.Interface(fn=chatbot,
                     inputs=gr.inputs.Textbox(lines=7, label="Enter your text"),
                     outputs="text",
                     title="Custom-trained AI Chatbot")

# Construct the GPT-based index from the text documents in the "Knowledge" directory
index = construct_index("Knowledge")
# Launch the Gradio interface and allow sharing
iface.launch(share=True)
