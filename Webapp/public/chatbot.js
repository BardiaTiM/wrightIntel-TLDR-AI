window.onload = function () {
  fetch('https://139c-2001-569-7f48-b900-c82b-ab3e-1868-54e4.ngrok-free.app/chat', {
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

  fetch('https://139c-2001-569-7f48-b900-c82b-ab3e-1868-54e4.ngrok-free.app/chat', {  // replace with your chatbot API's URL
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
      // assuming the chatbot's response is in a field called 'response' in the returned JSON
      document.getElementById('chatbotOutput').innerText = data.response;
  })
  .catch(error => console.log('Error:', error));
});


