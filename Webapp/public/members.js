window.onload = function () {
  fetch('http://localhost:5001/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      airline_name: 'Some Airline',
      input_text: 'Some question...'
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data.response))
  .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));
}

document.getElementById('chatbotForm').addEventListener('submit', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  var airlineInput = document.getElementById('airlineInput').value;
  var userInput = document.getElementById('userInput').value;

  // Show loading animation while waiting for response
  document.getElementById('chatbotOutput').innerHTML = '<div class="loading-animation"></div>';

  fetch('http://localhost:5001/chat', {  // replace with your chatbot API's URL
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          airline_name: airlineInput,
          input_text: userInput
      })
  })
  .then(response => response.json())
  .then(data => {
      // Assuming the chatbot's response is in a field called 'response' in the returned JSON
      document.getElementById('chatbotOutput').innerText = data.response;
  })
  .catch(error => console.log('Error:', error));
});
