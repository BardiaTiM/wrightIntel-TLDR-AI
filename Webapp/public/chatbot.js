function insertMessage(text, fromUser) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-bubble chat-bubble-${fromUser ? 'right' : 'left'}`;
  messageElement.innerText = text;

  const chatbotOutput = document.getElementById('chatbotOutput');
  chatbotOutput.appendChild(messageElement);

  // Scroll to bottom
  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
}


function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

document.getElementById('chatbotForm').addEventListener('submit', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  var airlineInput = document.getElementById('airlineInput').value;
  var userInput = document.getElementById('userInput').value;

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetch('https://3733-2001-569-7f48-b900-3081-f480-91ee-c130.ngrok-free.app/chat', {
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
      // Hide loading animation
      hideLoading();

      // assuming the chatbot's response is in a field called 'response' in the returned JSON
      insertMessage(data.response, false);
  })
  .catch(error => {
      // Hide loading animation
      hideLoading();

      console.log('Error:', error);
  });
});
