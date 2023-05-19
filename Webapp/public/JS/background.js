// Check if dark mode preference is stored in localStorage
var darkModeEnabled = localStorage.getItem('darkModeEnabled');

// If dark mode preference exists, convert it to a boolean value
if (darkModeEnabled !== null) {
    darkModeEnabled = JSON.parse(darkModeEnabled);
}

// Get the dark mode toggle checkbox element
var darkModeToggle = document.querySelector('#darkModeToggle');

// If dark mode preference is true, apply dark mode on page load
if (darkModeEnabled) {
    disableDarkMode();
    darkModeToggle.checked = true; // Update the checkbox state
} else {
    enableDarkMode();
    darkModeToggle.checked = false; // Update the checkbox state
}

// Add event listener to the dark mode toggle switch
darkModeToggle.addEventListener('click', function () {
    // Toggle dark mode
    darkModeEnabled = !darkModeEnabled; // Update the value

    if (darkModeEnabled) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    // Add dark mode class to body
    document.body.classList.add('dark-mode');

    // Store dark mode preference in localStorage
    localStorage.setItem('darkModeEnabled', true);
}

function disableDarkMode() {
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');

    // Remove dark mode preference from localStorage
    localStorage.removeItem('darkModeEnabled');
}