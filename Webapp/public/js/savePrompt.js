document.addEventListener('DOMContentLoaded', () => {
    const starCheckbox = document.getElementById('star');
    const airlineInput = document.getElementById('airlineInput');
    const userInput = document.getElementById('userInput');

    starCheckbox.addEventListener('change', async () => {
    const isChecked = starCheckbox.checked;
    if (isChecked) {
        console.log('Prompt is starred');
        const promptData = {
        airline: airlineInput.value,
        question: userInput.value,
        response: document.getElementById('chatbotOutput').innerText
        };

        // Perform an HTTP request to the server-side route
        try {
            console.log('Saving prompt:', promptData);
        const response = await fetch('/save-Prompt', {
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
});
