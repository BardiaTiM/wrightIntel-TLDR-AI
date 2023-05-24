// Function to enable dark mode
function enableDarkMode() {
    // Set background gradient for dark mode
    document.body.style.background = 'linear-gradient(-45deg, #0B0B0C, #121212, #393A41, #6A6B70)';
    document.body.style.backgroundSize = '400% 500%';
    document.body.style.animation = 'gradient 10s ease infinite';

    // Change font color to white
    document.body.style.color = 'white';

    // Store dark mode preference in localStorage
    localStorage.setItem('darkModeEnabled', true);
}


// Function to disable dark mode
function disableDarkMode() {
    // Set background gradient for light mode
    document.body.style.background = 'linear-gradient(-45deg, #90e0ef, #00b4d8, #caf0f8, #00b4d8)';
    document.body.style.backgroundSize = '400% 500%';
    document.body.style.animation = 'gradient 10s ease infinite';

    // Change font color to black
    document.body.style.color = 'black';

    // Remove dark mode preference from localStorage
    localStorage.removeItem('darkModeEnabled');
}

// Get the dark/light mode toggle checkbox element
var darkModeToggle = document.getElementById('darkMode');
var lightModeToggle = document.getElementById('lightMode');
var logoImage = document.querySelector('.logo');

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
    // Toggle light mode
    darkModeEnabled = true; // Update the value
    enableDarkMode();
    logoImage.src = 'logo-white.png';
});

// Add event listener to the dark mode toggle switch
lightModeToggle.addEventListener('click', function () {
    // Toggle light mode
    darkModeEnabled = false; // Update the value
    disableDarkMode();
    logoImage.src = 'logo-black.png';
});
