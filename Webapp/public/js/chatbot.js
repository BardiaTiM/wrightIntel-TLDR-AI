const host =
  "http://localhost:5001";
let messageIndex = 0;

function insertMessage(text, fromUser) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-bubble chat-bubble-${
    fromUser ? "right" : "left"
  } message-${messageIndex}`;
  messageElement.id = `message-${messageIndex}-${fromUser ? "right" : "left"}`;
  messageElement.dataset.index = messageIndex;
  messageElement.dataset.airline =
    document.getElementById("airlineInput").value;

  const wrapperElement = document.createElement("div");
  wrapperElement.className = "message-wrapper";

  if (isValidUrl(text)) {
    const linkElement = document.createElement("a");
    linkElement.href = text;
    linkElement.target = "_blank"; // to open in a new tab
    linkElement.rel = "noopener noreferrer"; // for security reasons
    linkElement.textContent = text;
    messageElement.appendChild(linkElement);
  } else {
    animateText(text, messageElement);
  }

  const chatbotOutput = document.getElementById("chatbotOutput");

  const heartContainer = document.createElement("div");
  heartContainer.dataset.index = messageIndex;

  if (!fromUser) {
    heartContainer.className = "heart-container";

    // Set heartContainer to initially be transparent
    heartContainer.style.opacity = "0";

    const heartCheckbox = document.createElement("input");
    heartCheckbox.type = "checkbox";
    heartCheckbox.id = `heart-${messageIndex}`;
    heartCheckbox.className = "heart-checkbox";
    heartCheckbox.checked = false;

    const heartLabel = document.createElement("label");
    heartLabel.htmlFor = `heart-${messageIndex}`;
    heartLabel.className = "heart";
    heartLabel.innerHTML = "&#9829;";

    heartContainer.appendChild(heartCheckbox);
    heartContainer.appendChild(heartLabel);

    // Add event listeners to wrapperElement
    wrapperElement.addEventListener("mouseover", function () {
      heartContainer.style.opacity = "1"; // When mouse is over, heart appears
    });

    wrapperElement.addEventListener("mouseout", function () {
      if (!heartCheckbox.checked) {
        // Only make the heart transparent if it's not checked
        heartContainer.style.opacity = "0"; // When mouse leaves, heart becomes transparent
      }
    });
  }

  wrapperElement.appendChild(messageElement);
  wrapperElement.appendChild(heartContainer);
  chatbotOutput.appendChild(wrapperElement);

  if (!fromUser) {
  // Add the div containing an hr tag
  const hrDiv = document.createElement("div");
  const hrElement = document.createElement("hr");
  hrDiv.appendChild(hrElement);
  chatbotOutput.appendChild(hrDiv);
  }
    
  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;

  heartContainer.style.display = "flex";
  heartContainer.style.justifyContent = "flex-end";
  heartContainer.style.padding = "0";
  heartContainer.style.margin = "0";
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
  const words = text.split(" ");
  let currentIndex = 0;

  const timer = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(timer);
      return;
    }

    let word = words[currentIndex];
    let trailingChar = "";
    if (isValidUrl(word)) {
      // Remove trailing punctuation and save it
      if (/[.,!?]/.test(word[word.length - 1])) {
        trailingChar = word[word.length - 1];
        word = word.substring(0, word.length - 1);
      }

      const linkElement = document.createElement("a");
      linkElement.href = word;
      linkElement.target = "_blank"; // to open in a new tab
      linkElement.rel = "noopener noreferrer"; // for security reasons
      linkElement.textContent = word;
      messageElement.appendChild(linkElement);
      messageElement.appendChild(document.createTextNode(trailingChar + " ")); // add trailing punctuation and a space after the link
    } else {
      const currentText = messageElement.innerText;
      messageElement.innerText = currentText + " " + words[currentIndex];
    }

    currentIndex++;
  }, 100); // Adjust the delay (in milliseconds) between each word display
}

function showLoading() {
  var chatbotOutput = document.getElementById("chatbotOutput");

  var loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.className = "loading-container";
  loadingDiv.innerHTML =
    '<img src="loading.gif" alt="Loading..." class="loading">';

  chatbotOutput.appendChild(loadingDiv);

  // Scroll to bottom
  chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
}

function hideLoading() {
  var loadingDiv = document.getElementById("loading");
  if (loadingDiv) {
    loadingDiv.parentNode.removeChild(loadingDiv);
  }
}

// Add an event listener to the parent element of the heart checkboxes
document.addEventListener("change", async (event) => {
  const heartCheckbox = event.target;
  if (heartCheckbox.classList.contains("heart-checkbox")) {
    const heartContainer = heartCheckbox.closest(".heart-container");
    const messageIndex = heartContainer.dataset.index;
    const isChecked = heartCheckbox.checked;
    console.log(`heart checkbox ${messageIndex} changed to ${isChecked}`);
    if (isChecked) {
      // Change colour to yellow
      heartContainer.querySelector(".heart").style.color = "#A53860";
      heartContainer.querySelector(".heart").style.opacity = "1";
      // Save prompt data
      const promptData = {
        airline: document.getElementById(`message-${messageIndex}-left`).dataset
          .airline,
        question: document.getElementById(`message-${messageIndex}-right`)
          .innerText,
        response: document.getElementById(`message-${messageIndex}-left`)
          .innerText,
      };
      console.log("Saving prompt:", promptData);
      try {
        // Send a POST request to the server-side route
        const response = await fetch("/save-Prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Convert the JS object into a JSON string
          body: JSON.stringify({ prompt: promptData }),
        });

        // Handle the response from the server-side route
        if (response.ok) {
          // Prompt saved successfully
          console.log("Prompt saved successfully");
        } else {
          // Error occurred while saving the prompt
          console.error("Error saving prompt:", response.status);
        }
      } catch (error) {
        console.error("Error saving prompt:", error);
      }
    } else {
      // Chnage colour to gray
      heartContainer.querySelector(".heart").style.color = "gray";
      heartContainer.querySelector(".heart").style.opacity = "0.4";
      // Delete prompt data
      const airline = document.getElementById(`message-${messageIndex}-left`)
        .dataset.airline;
      const question = document.getElementById(
        `message-${messageIndex}-right`
      ).innerText;
      const response = document.getElementById(
        `message-${messageIndex}-left`
      ).innerText;
      console.log("Deleting prompt:", airline, question, response);
      // Send a fetch request to the server to delete the prompt
      fetch("/delete-Prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: { airline, question, response } }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log(data);
          // Hide the accordion item associated with the clicked heart
          var accordionItem = heart.closest(".accordion-item");
          accordionItem.style.display = "none";
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    }
  }
});

document
  .getElementById("chatbotForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from being submitted normally

    var airlineInput = document.getElementById("airlineInput").value;
    var userInput = document.getElementById("userInput").value;

    // Insert user's question
    insertMessage(userInput, true);

    // Show loading animation
    showLoading();

    fetch(host + "/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        airline_name: airlineInput,
        input_text: userInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hide loading animation
        hideLoading();

        // assuming the chatbot's response is in a field called 'response' in the returned JSON
        insertMessage(data.response, false);
        messageIndex++;
      })
      .catch((error) => {
        // Hide loading animation
        hideLoading();

        console.log("Error:", error);
      });
  });

function fetchChatbotResponse(userInput) {
  var airlineInput = document.getElementById("airlineInput").value;
  console.log(airlineInput);

  fetch(host + "/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      airline_name: airlineInput,
      input_text: userInput,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hide loading animation
      hideLoading();

      // assuming the chatbot's response is in a field called 'response' in the returned JSON
      insertMessage(data.response, false);
    })
    .catch((error) => {
      // Hide loading animation
      hideLoading();

      console.log("Error:", error);
    });
}

document.getElementById("button1").addEventListener("click", function (event) {
  event.preventDefault(); // prevent the form from being submitted normally

  // Set your pre-defined question for button1
  var userInput =
    "I was recently denied boarding on my flight due to overbooking. Can you please provide information on the compensation or refund options available to me?";

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById("button2").addEventListener("click", function (event) {
  event.preventDefault(); // prevent the form from being submitted normally

  // Set your pre-defined question for button2
  var userInput =
    "My flight was canceled, and I would like to know what compensation or refund options are available to passengers in such cases.";

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById("button3").addEventListener("click", function (event) {
  event.preventDefault(); // prevent the form from being submitted normally

  // Set your pre-defined question for button3
  var userInput =
    "My flight was significantly delayed, and I would like to inquire about the compensation or refund policies for passengers affected by extended delays.";

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

document.getElementById("button4").addEventListener("click", function (event) {
  event.preventDefault(); // prevent the form from being submitted normally

  // Set your pre-defined question for button4
  var userInput =
    "Unfortunately, my checked baggage has been lost/damaged during my journey. Can you please guide me on the procedure for filing a claim and the compensation options available?";

  // Insert user's question
  insertMessage(userInput, true);

  // Show loading animation
  showLoading();

  fetchChatbotResponse(userInput);
});

// This is a helper function to avoid repetition in the code
document
  .getElementById("flightNumForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var flightNum = document.getElementById("flightNumInput").value;

    fetch(host + "/flight_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flight_num: flightNum,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        var airlineName = data.airline_name;

        // <option selected>Enter airline name...</option>
        // <option value="aircanada">Air Canada</option>
        // <option value="airtransat">Airtransat</option>
        // <option value="alaskaairlines">Alaska Airlines</option>
        // <option value="allegiant">Allegiant</option>
        // <option value="americanairlines">American Airlines</option>
        // <option value="deltaairlines">Delta Airlines</option>
        // <option value="flair">Flair Airlines</option>
        // <option value="frontierairlines">Frontier Airlines</option>
        // <option value="hawaiianairlines">Hawaiian Airlines</option>
        // <option value="jetblue">JetBlue</option>
        // <option value="porter">Porter Airlines</option>
        // <option value="southwestairlines">Southwest Airlines</option>
        // <option value="spiritairline">Spirit Airlines</option>
        // <option value="sunwing">Sunwing Airlines</option>
        // <option value="unitedairlines">United Airlines</option>
        // <option value="westjet">WestJet</option>

        // Update airline name based on conditions
        if (airlineName.toLowerCase().includes("west")) {
          formalAirlineName = "WestJet";
          airlineName = "westjet";
        } else if (
          airlineName.toLowerCase().includes("air canada") ||
          airlineName.toLowerCase().includes("jazz")
        ) {
          formalAirlineName = "Air Canada";
          airlineName = "aircanada";
        } else if (airlineName.toLowerCase().includes("transat")) {
          formalAirlineName = "Air Transat";
          airlineName = "airtransat";
        } else if (airlineName.toLowerCase().includes("sunwing")) {
          formalAirlineName = "Sunwing Airlines";
          airlineName = "sunwing";
        } else if (airlineName.toLowerCase().includes("porter")) {
          formalAirlineName = "Porter Airlines";
          airlineName = "porter";
        } else if (airlineName.toLowerCase().includes("alaska")) {
          formalAirlineName = "Alaska Airlines";
          airlineName = "alaskaairlines";
        } else if (airlineName.toLowerCase().includes("allegiant")) {
          formalAirlineName = "Allegiant Air";
          airlineName = "allegiant";
        } else if (airlineName.toLowerCase().includes("american")) {
          formalAirlineName = "American Airlines";
          airlineName = "americanairlines";
        } else if (airlineName.toLowerCase().includes("delta")) {
          formalAirlineName = "Delta Airlines";
          airlineName = "deltaairlines";
        } else if (airlineName.toLowerCase().includes("flair")) {
          formalAirlineName = "Flair Airlines";
          airlineName = "flair";
        } else if (airlineName.toLowerCase().includes("frontier")) {
          formalAirlineName = "Frontier Airlines";
          airlineName = "frontierairlines";
        } else if (airlineName.toLowerCase().includes("hawaiian")) {
          formalAirlineName = "Hawaiian Airlines";
          airlineName = "hawaiianairlines";
        } else if (airlineName.toLowerCase().includes("jetblue")) {
          formalAirlineName = "JetBlue";
          airlineName = "jetblue";
        } else if (airlineName.toLowerCase().includes("southwest")) {
          formalAirlineName = "Southwest Airlines";
          airlineName = "southwestairlines";
        } else if (airlineName.toLowerCase().includes("spirit")) {
          formalAirlineName = "Spirit Airlines";
          airlineName = "spiritairline";
        } else if (airlineName.toLowerCase().includes("united")) {
          formalAirlineName = "United Airlines";
          airlineName = "unitedairlines";
        } else {
          formalAirlineName = "Air Canada";
          airlineName = "aircanada";
        }

        updateAirlineName(airlineName, formalAirlineName);
        var departureDelay = data.departure_delay;
        var flightStatus = data.flight_status;
        var scheduledTime = data.scheduled_time;

        console.log("Airline Name:", airlineName);
        console.log("Departure Delay:", departureDelay);
        console.log("Flight Status:", flightStatus);
        console.log("Scheduled Time:", scheduledTime);

        if (flightStatus.includes("Delayed")) {
          var userInput =
            "My flight is delayed by " + departureDelay + " hours.";
        } else {
          var userInput = "My flight is scheduled to depart on time.";
        }

        insertMessage(userInput, true);

        // Show loading animation
        showLoading();

        fetchChatbotResponse(userInput);
      })
      .catch((error) => {
        // Hide loading animation
        hideLoading();

        console.log("Error:", error);
      });

    console.log("sendFlight");
  });

// Function to update the airline name in the select element
function updateAirlineName(airlineName, formalAirlineName) {
  var airlineInput = document.getElementById("airlineInput");
  var option = document.createElement("option");
  option.value = airlineName;
  option.textContent = formalAirlineName;

  // Remove the existing options
  while (airlineInput.firstChild) {
    airlineInput.firstChild.remove();
  }

  // Add the new option
  airlineInput.appendChild(option);

  // Select the new option
  option.selected = true;
}
