let messageIndex = 0;
function insertMessage(text, fromUser) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-bubble chat-bubble-${fromUser ? 'right' : 'left'} message-${messageIndex}`;
  messageElement.id = `message-${messageIndex}-${fromUser ? 'right' : 'left'}`;
  messageElement.dataset.index = messageIndex;

  const chatbotOutput = document.getElementById('chatbotOutput');

  const starContainer = document.createElement('div');
  starContainer.dataset.index = messageIndex;

  if (!fromUser) {
    starContainer.className = 'star-container';

    const starCheckbox = document.createElement('input');
    starCheckbox.type = 'checkbox';
    starCheckbox.id = `star-${messageIndex}`;
    starCheckbox.className = 'star-checkbox';
    starCheckbox.checked = false; // Set checked status initially to false

    const starLabel = document.createElement('label');
    starLabel.htmlFor = `star-${messageIndex}`;
    starLabel.className = 'star';
    starLabel.innerHTML = '&#9733;';

    starContainer.appendChild(starCheckbox);
    starContainer.appendChild(starLabel);
  }

  chatbotOutput.appendChild(starContainer);
  chatbotOutput.appendChild(messageElement);

  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;

  animateText(text, messageElement);

  starContainer.style.display = 'flex';
  starContainer.style.justifyContent = 'flex-end';
  starContainer.style.padding = '0';
  starContainer.style.margin = '0';

}

function animateText(text, messageElement) {
  const words = text.split(' ');
  let currentIndex = 0;

  const timer = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(timer);
      return;
    }

    const currentText = messageElement.innerText;
    messageElement.innerText = currentText + ' ' + words[currentIndex];
    currentIndex++;
  }, 100); // Adjust the delay (in milliseconds) between each word display
}


function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// Add an event listener to the parent element of the star checkboxes
document.addEventListener('change', (event) => {
  const starCheckbox = event.target;
  if (starCheckbox.classList.contains('star-checkbox')) {
    const starContainer = starCheckbox.closest('.star-container');
    const messageIndex = starContainer.dataset.index;
    const isChecked = starCheckbox.checked;
    if (isChecked) {
      const response = document.getElementById(`message-${messageIndex}-left`).innerText;
      const question = document.getElementById(`message-${messageIndex}-right`).innerText;
      console.log('question: ', question);
      console.log(`Star clicked for message index: ${messageIndex}`);
      console.log(response);
      const promptData = {
        airline: airlineInput.value,
        question: userInput.value,
        response: document.getElementById('chatbotOutput').innerText
        };
    }
  }
});

document.getElementById('chatbotForm').addEventListener('submit', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  var airlineInput = document.getElementById('airlineInput').value;
  var userInput = document.getElementById('userInput').value;
  
  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();
  

  fetch('http://localhost:5001/chat', {
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
      messageIndex++;
  })
  .catch(error => {
      // Hide loading animation
      hideLoading();

      console.log('Error:', error);
  });
});
