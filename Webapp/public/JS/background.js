// Function to enable dark mode
function enableDarkMode() {
    // Add dark mode class to body
    document.body.classList.add('dark-mode');

    // Change font color to white
    document.body.style.color = 'white';

    // Store dark mode preference in localStorage
    localStorage.setItem('darkModeEnabled', true);
}

// Function to disable dark mode
function disableDarkMode() {
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');

    // Change font color to black
    document.body.style.color = 'black';

    // Remove dark mode preference from localStorage
    localStorage.removeItem('darkModeEnabled');
}

// Get the dark mode toggle checkbox element
var darkModeToggle = document.querySelector('#darkModeToggle');

// Check if dark mode preference is stored in localStorage
var darkModeEnabled = localStorage.getItem('darkModeEnabled');

// If dark mode preference exists, convert it to a boolean value
if (darkModeEnabled !== null) {
    darkModeEnabled = JSON.parse(darkModeEnabled);

    if (darkModeEnabled) {
        enableDarkMode();
        darkModeToggle.checked = true; // Update the checkbox state
    } else {
        disableDarkMode();
        darkModeToggle.checked = false; // Update the checkbox state
    }
}

// Add event listener to the dark mode toggle switch
darkModeToggle.addEventListener('click', function () {
    // Toggle dark mode
    darkModeEnabled = !darkModeEnabled; // Update the value

    if (darkModeEnabled) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
