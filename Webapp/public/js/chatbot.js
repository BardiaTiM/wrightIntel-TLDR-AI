const host = 'https://c931-2001-569-7f48-b900-75c2-b872-5eb8-303b.ngrok-free.app/chat';


function insertMessage(text, fromUser) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-bubble chat-bubble-${fromUser ? 'right' : 'left'}`;

  if (isValidUrl(text)) {
    const linkElement = document.createElement('a');
    linkElement.href = text;
    linkElement.target = "_blank"; // to open in a new tab
    linkElement.rel = "noopener noreferrer"; // for security reasons
    linkElement.textContent = text;
    messageElement.appendChild(linkElement);
  } else {
    animateText(text, messageElement);
  }

  const chatbotOutput = document.getElementById('chatbotOutput');
  chatbotOutput.appendChild(messageElement);

  // Scroll to bottom
  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }
  return true;
}


function animateText(text, messageElement) {
  const words = text.split(' ');
  let currentIndex = 0;

  const timer = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(timer);
      return;
    }

    let word = words[currentIndex];
    let trailingChar = '';
    if (isValidUrl(word)) {
      // Remove trailing punctuation and save it
      if (/[.,!?]/.test(word[word.length - 1])) {
        trailingChar = word[word.length - 1];
        word = word.substring(0, word.length - 1);
      }

      const linkElement = document.createElement('a');
      linkElement.href = word;
      linkElement.target = "_blank"; // to open in a new tab
      linkElement.rel = "noopener noreferrer"; // for security reasons
      linkElement.textContent = word;
      messageElement.appendChild(linkElement);
      messageElement.appendChild(document.createTextNode(trailingChar + " ")); // add trailing punctuation and a space after the link
    } else {
      const currentText = messageElement.innerText;
      messageElement.innerText = currentText + ' ' + words[currentIndex];
    }

    currentIndex++;
  }, 100); // Adjust the delay (in milliseconds) between each word display
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

  fetch(host, {
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

document.getElementById('button1').addEventListener('click', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  // Set your pre-defined question for button1
  var userInput = 'I was recently denied boarding on my flight due to overbooking. Can you please provide information on the compensation or refund options available to me?';

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById('button2').addEventListener('click', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  // Set your pre-defined question for button2
  var userInput = 'My flight was canceled, and I would like to know what compensation or refund options are available to passengers in such cases.';

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById('button3').addEventListener('click', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  // Set your pre-defined question for button3
  var userInput = 'My flight was significantly delayed, and I would like to inquire about the compensation or refund policies for passengers affected by extended delays.';

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById('button4').addEventListener('click', function(event) {
  event.preventDefault();  // prevent the form from being submitted normally

  // Set your pre-defined question for button4
  var userInput = 'Unfortunately, my checked baggage has been lost/damaged during my journey. Can you please guide me on the procedure for filing a claim and the compensation options available?';

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

// This is a helper function to avoid repetition in the code
function fetchChatbotResponse(userInput) {
  var airlineInput = document.getElementById('airlineInput').value;

  fetch(host, {
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
}

