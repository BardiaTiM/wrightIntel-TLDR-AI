const starCheckbox = document.getElementById('star');
const airlineInput = document.getElementById('airlineInput');
const userInput = document.getElementById('userInput');
const tldrResponse = document.getElementById('chatbotOutput');

starCheckbox.addEventListener('change', async () => {
  const isChecked = starCheckbox.checked;
  if (isChecked) {
    const promptData = {
      airline: airlineInput.value,
      question: userInput.value,
      response: tldrResponse.value
    };

    // Perform an HTTP request to the server-side route
    try {
      const response = await fetch('/savePrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
  }
});
