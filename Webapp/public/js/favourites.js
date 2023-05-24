// Function to toggle the color of the heart and hide the accordion div when clicked
function toggleheartColor(event) {
  var heart = event.target;
  heart.style.color = heart.style.color === 'black' ? 'A53860' : 'black';

  // Get the prompt details associated with the heart
  var _id = heart.dataset.promptId;
  console.log(_id);
  var airline = heart.dataset.airline;
  var question = heart.dataset.question;
  var response = heart.dataset.response;

  // Send a fetch request to the server to delete the prompt
  fetch('/delete-Prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: { _id, airline, question, response } })
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);

      // Hide the accordion item associated with the clicked heart
      var accordionItem = heart.closest('.accordion-item');
      accordionItem.style.display = 'none';
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to add a new accordion item
  function addAccordionItem(prompts) {
    prompts.forEach((prompt, index) => {
      // Create a unique ID for the new accordion item
      var accordionItemID = 'accordionItem' + index;

      // Create the HTML for the new accordion item
      var newAccordionItem = document.createElement('div');
      newAccordionItem.classList.add('accordion-item');
      newAccordionItem.innerHTML = `
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionItemID}" aria-expanded="true" aria-controls="${accordionItemID}">
            Airline: ${prompt.airline}<br> Question: ${prompt.question}
          </button>
        </h2>
        <div id="${accordionItemID}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="heart-container">
              <input type="checkbox" id="heart-${index}" class="heart-checkbox">
              <label for="heart-${index}" class="heart" style="color: #A53860;" onclick="toggleheartColor(event)" data-prompt-id="${prompt.id}" data-airline="${prompt.airline}" data-question="${prompt.question}" data-response="${prompt.response}">&#9829;</label>
            </div>
            <p>${prompt.response}</p>
          </div>
        </div>
      `;

      // Append the new accordion item to the accordion container
      var accordionContainer = document.querySelector('.accordion');
      accordionContainer.appendChild(newAccordionItem);
    });
  }

  // Fetch the prompts data and add the initial accordion items
  fetch('/get-Prompts')
    .then(response => response.json())
    .then(data => {
      // Add the initial accordion items with the fetched prompts
      console.log(data);
      addAccordionItem(data);
    }).catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
});
