window.onload = function () {
  fetch('http://localhost:5000/chat', {
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
