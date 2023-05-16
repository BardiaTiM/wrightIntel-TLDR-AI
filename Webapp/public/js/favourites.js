document.addEventListener('DOMContentLoaded', function() {
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
            Airline: ${prompt.airline} Question: ${prompt.question}
          </button>
        </h2>
        <div id="${accordionItemID}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <div class="star-container">
        <input type="checkbox" id="star" class="star-checkbox">
        <label for="star" class="star" style="color: yellow;">&#9734;</label>
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

  // Function to remove the last accordion item
  function removeAccordionItem() {
    // Get the accordion container
    var accordionContainer = document.querySelector('.accordion');

    // Check if there are any accordion items
    if (accordionContainer.childElementCount > 0) {
      // Remove the last accordion item
      accordionContainer.removeChild(accordionContainer.lastElementChild);
    }
  }

  // Event listener for the "Remove Accordion Item" button
  var removeAccordionItemButton = document.getElementById('removeAccordionItem');
  removeAccordionItemButton.addEventListener('click', function() {
    removeAccordionItem();
  });

  // Fetch the prompts data and add the initial accordion items
  fetch('/get-Prompts')
    .then(response => response.json())
    .then(data => {
      // Add the initial accordion items with the fetched prompts
      console.log(data);
      addAccordionItem(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
});
