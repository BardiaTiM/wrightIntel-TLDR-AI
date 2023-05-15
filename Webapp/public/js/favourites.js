document.addEventListener('DOMContentLoaded', function() {
    // Counter to track the number of accordion items
    var accordionItemCount = 0;
  
    // Function to add a new accordion item
    function addAccordionItem() {
      accordionItemCount++;
  
      // Create a unique ID for the new accordion item
      var accordionItemID = 'accordionItem' + accordionItemCount;
  
      // Create the HTML for the new accordion item
      var newAccordionItem = document.createElement('div');
      newAccordionItem.classList.add('accordion-item');
      newAccordionItem.innerHTML = `
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionItemID}" aria-expanded="true" aria-controls="${accordionItemID}">
            Accordion Item #${accordionItemCount}
          </button>
        </h2>
        <div id="${accordionItemID}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>Text</strong>
          </div>
        </div>
      `;
  
      // Append the new accordion item to the accordion container
      var accordionContainer = document.querySelector('.accordion');
      accordionContainer.appendChild(newAccordionItem);
    }
  
    // Function to remove the last accordion item
    function removeAccordionItem() {
      // Check if there are any accordion items
      if (accordionItemCount > 0) {
        // Remove the last accordion item
        var accordionContainer = document.querySelector('.accordion');
        accordionContainer.removeChild(accordionContainer.lastElementChild);
        accordionItemCount--;
      }
    }
  
    // Event listener for the "Add Accordion Item" button
    var addAccordionItemButton = document.getElementById('addAccordionItem');
    addAccordionItemButton.addEventListener('click', function() {
      addAccordionItem();
    });
  
    // Event listener for the "Remove Accordion Item" button
    var removeAccordionItemButton = document.getElementById('removeAccordionItem');
    removeAccordionItemButton.addEventListener('click', function() {
      removeAccordionItem();
    });
  });
  