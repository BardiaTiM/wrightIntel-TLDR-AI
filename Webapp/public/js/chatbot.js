const host = 'https://c931-2001-569-7f48-b900-75c2-b872-5eb8-303b.ngrok-free.app/chat';
let messageIndex = 0;

function insertMessage(text, fromUser) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-bubble chat-bubble-${fromUser ? 'right' : 'left'} message-${messageIndex}`;
  messageElement.id = `message-${messageIndex}-${fromUser ? 'right' : 'left'}`;
  messageElement.dataset.index = messageIndex;
  messageElement.dataset.airline = document.getElementById('airlineInput').value;

  const wrapperElement = document.createElement('div');
  wrapperElement.className = 'message-wrapper';

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

  const starContainer = document.createElement('div');
  starContainer.dataset.index = messageIndex;

  if (!fromUser) {
    starContainer.className = 'star-container';

    // Set starContainer to initially be transparent
    starContainer.style.opacity = '0';

    const starCheckbox = document.createElement('input');
    starCheckbox.type = 'checkbox';
    starCheckbox.id = `star-${messageIndex}`;
    starCheckbox.className = 'star-checkbox';
    starCheckbox.checked = false;

    const starLabel = document.createElement('label');
    starLabel.htmlFor = `star-${messageIndex}`;
    starLabel.className = 'star';
    starLabel.innerHTML = '&#9733;';

    starContainer.appendChild(starCheckbox);
    starContainer.appendChild(starLabel);

    // Add event listeners to wrapperElement
    wrapperElement.addEventListener('mouseover', function() {
      starContainer.style.opacity = '1'; // When mouse is over, star appears
    });

    wrapperElement.addEventListener('mouseout', function() {
      if (!starCheckbox.checked) { // Only make the star transparent if it's not checked
        starContainer.style.opacity = '0'; // When mouse leaves, star becomes transparent
      }
    });
  }

  wrapperElement.appendChild(messageElement);
  wrapperElement.appendChild(starContainer);

  chatbotOutput.appendChild(wrapperElement);
  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;

  starContainer.style.display = 'flex';
  starContainer.style.justifyContent = 'flex-end';
  starContainer.style.padding = '0';
  starContainer.style.margin = '0';
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
    var chatbotOutput = document.getElementById('chatbotOutput');

    var loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'loading-container';
    loadingDiv.innerHTML = '<img src="loading.gif" alt="Loading..." class="loading">';

    chatbotOutput.appendChild(loadingDiv);

    // Scroll to bottom
    chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
}

function hideLoading() {
    var loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.parentNode.removeChild(loadingDiv);
    }
}

// Add an event listener to the parent element of the star checkboxes
document.addEventListener('change', async (event) => {
  const starCheckbox = event.target;
  if (starCheckbox.classList.contains('star-checkbox')) {
    const starContainer = starCheckbox.closest('.star-container');
    const messageIndex = starContainer.dataset.index;
    const isChecked = starCheckbox.checked;
    console.log(`Star checkbox ${messageIndex} changed to ${isChecked}`);
    if (isChecked) {
      // Change colour to yellow
      starContainer.querySelector('.star').style.color = 'yellow';
      // Save prompt data
      const promptData = {
        airline: document.getElementById(`message-${messageIndex}-left`).dataset.airline,
        question: document.getElementById(`message-${messageIndex}-right`).innerText,
        response: document.getElementById(`message-${messageIndex}-left`).innerText
        };
      console.log('Saving prompt:', promptData);
      try {
        // Send a POST request to the server-side route
        const response = await fetch('/save-Prompt', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        // Convert the JS object into a JSON string
        body: JSON.stringify({ prompt: promptData })
    });

    // Handle the response from the server-side route
    if (response.ok) {
        // Prompt saved successfully
        console.log('Prompt saved successfully');
    } else {
        // Error occurred while saving the prompt
        console.error('Error saving prompt:', response.status);
    }
    } catch (error) {
    console.error('Error saving prompt:', error);
    }
    } else {
      // Chnage colour to gray
      starContainer.querySelector('.star').style.color = 'gray';
      // Delete prompt data
      const airline = document.getElementById(`message-${messageIndex}-left`).dataset.airline;
      const question = document.getElementById(`message-${messageIndex}-right`).innerText;
      const response = document.getElementById(`message-${messageIndex}-left`).innerText;
    console.log('Deleting prompt:', airline, question, response);
    // Send a fetch request to the server to delete the prompt
    fetch('/delete-Prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: { airline, question, response } })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
      // Hide the accordion item associated with the clicked star
      var accordionItem = star.closest('.accordion-item');
      accordionItem.style.display = 'none';
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
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
      messageIndex++;
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

