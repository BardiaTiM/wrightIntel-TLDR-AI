// Function to update button colors based on the current theme
function updateButtonColors() {
  const green = '#7b917d';
  const brown = '#c57b57';
  const buttons = document.querySelectorAll('.buttons-container button');

  buttons.forEach(function (button) {
    button.style.border = 'none';
    if (document.body.classList.contains('dark-mode')) {
      // Update button colors for dark mode
      changeButtonBackgroundOrangeToGreen(button, green, brown);
    } else {
      // Update button colors for light mode
      changeButtonBackgroundGreenToOrange(button, green, brown);
    }
  });
}

function updateMessageBackground() {
  const green = '#627264';
  const brown = '#c57b57';
  const buttons = document.querySelectorAll('div.chat-bubble.chat-bubble-right.message-0');

  buttons.forEach(function (div) {
    if (document.body.classList.contains('dark-mode')) {
      div.style.backgroundColor = brown;
    } else {
      div.style.backgroundColor = green;
    }
  });
}


function changeButtonBackgroundOrangeToGreen(button, over, out) {
  if (button) {
    button.style.background = out;
    button.style.color = 'white';

    button.addEventListener('mouseover', function () {
      button.style.background = over;
      // Additional styles for the hover state
    });

    button.addEventListener('mouseout', function () {
      button.style.background = out;
      button.style.transform = 'scale(1.02)';
      button.style.transition = 'all 0.5s ease';
      // Additional styles for the non-hover state
    });
  }
}

function changeButtonBackgroundGreenToOrange(button, over, out) {
  if (button) {
    button.style.background = over;
    button.style.color = 'white';

    button.addEventListener('mouseover', function () {
      button.style.background = out;
      // Additional styles for the hover state
    });

    button.addEventListener('mouseout', function () {
      button.style.background = over;
      button.style.transform = 'scale(1.02)';
      button.style.transition = 'all 0.5s ease';
      // Additional styles for the non-hover state
    });
  }
}

// Function to enable dark mode
function enableDarkMode() {
  const green = '#7b917d';
  const brown = '#c57b57';
  // Set background gradient for dark mode
  document.body.style.background = '#2C3E2E';
  // document.body.style.backgroundSize = '400% 500%';
  // document.body.style.animation = 'gradient 10s ease infinite';

  // Change font color to white
  document.body.style.color = 'white';

  // Change header and footer background and font color
  var header = document.querySelector('.header');
  var footer = document.querySelector('footer');
  var overlay = document.querySelector('#overlay');
  if (header) {
    header.style.background = 'rgb(33, 33, 33)';
    header.style.color = 'white';
  }
  if (footer) {
    footer.style.background = 'rgb(33, 33, 33)';
    footer.style.color = 'white';
  }
  if (overlay) {
    overlay.style.background = '#627264';
    overlay.style.color = 'white';
  }

  // Set logo for dark mode
  var logoImage = document.querySelector('#logo');
  if (logoImage) {
    logoImage.src = '/logo_images/white.png';
  }

  const indexLogo = document.querySelector('#index-logo');
  if (indexLogo) {
    indexLogo.src = '/logo_images/white-font.png';
  }

  const getStartedButton = document.querySelector('.members-button');
  changeButtonBackgroundOrangeToGreen(getStartedButton, green, brown);
  const loginButton = document.querySelector('#submit');
  changeButtonBackgroundOrangeToGreen(loginButton, green, brown);
  const registerButton = document.querySelector('#create-account');
  changeButtonBackgroundGreenToOrange(registerButton, green, brown);
  const forgotPasswordButton = document.querySelector('#send');
  changeButtonBackgroundGreenToOrange(forgotPasswordButton, green, brown);
  const cancelButtonForgotPassword = document.querySelector('#cancel');
  if (cancelButtonForgotPassword) {
    cancelButtonForgotPassword.style.color = 'white';
  }
  const overlayButtons = document.querySelectorAll('.overlay-content button');
  overlayButtons.forEach(function (button) {
    button.style.border = 'none';
    changeButtonBackgroundOrangeToGreen(button, green, brown);
  });
  const editButton = document.querySelector('#edit-button');
  changeButtonBackgroundOrangeToGreen(editButton, green, brown);
  const headerContainer = document.querySelector('.header-container');
  if (headerContainer) {
    headerContainer.style.color = 'black';
    headerContainer.style.background = 'rgb(33, 33, 33)';
  }

  const goBackToIndexButton = document.querySelector('#go-back-button');
  if (goBackToIndexButton) {
    goBackToIndexButton.style.color = 'white';
  }

  const navLinks = document.querySelectorAll('li.nav-item.text-center a.nav-link');
  navLinks.forEach(function (link) {
    link.style.color = brown;

    link.addEventListener('mouseover', function () {
      link.style.color = green;
      // Additional styles for the hover state
    });

    link.addEventListener('mouseout', function () {
      link.style.color = brown;
      // Additional styles for the non-hover state
    });
  });

  const settingButton = document.querySelector('button.btn.btn-secondary.dropdown-toggle.dropdown-item.nav-link');
  if (settingButton) {
    settingButton.style.color = brown;
  }

  settingButton.addEventListener('mouseover', function () {
    settingButton.style.color = green;
    // Additional styles for the hover state
  });

  settingButton.addEventListener('mouseout', function () {
    settingButton.style.color = brown;
    // Additional styles for the non-hover state
  });

  // Remove light mode class from body
  document.body.classList.remove('light-mode');

  // Add dark mode class to body
  document.body.classList.add('dark-mode');

  // Update button colors
  updateButtonColors();
  updateMessageBackground();

  // Store dark mode preference in localStorage
  localStorage.setItem('darkModeEnabled', 'true');
}

// Function to enable light mode
function enableLightMode() {
  const green = '#7b917d';
  const brown = '#c57b57';
  // Set background gradient for light mode #F4C397
  document.body.style.background = '#F4C397';
  // document.body.style.backgroundSize = '400% 500%';
  // document.body.style.animation = 'gradient 10s ease infinite';

  // Change font color to black
  document.body.style.color = 'black';

  // Change header and footer background and font color
  var header = document.querySelector('.header');
  var footer = document.querySelector('footer');
  if (header) {
    header.style.background = 'rgb(241, 229, 229)';
    header.style.color = 'black';
  }
  if (footer) {
    footer.style.background = 'rgb(241, 229, 229)';
    footer.style.color = 'black';
  }

  // Set logo for light mode
  var logoImage = document.querySelector('#logo');
  if (logoImage) {
    logoImage.src = '/logo_images/black.png';
  }

  const indexLogo = document.querySelector('#index-logo');
  if (indexLogo) {
    indexLogo.src = '/logo_images/black-font.png';
  }

  const headerContainer = document.querySelector('.header-container');
  if (headerContainer) {
    headerContainer.style.color = 'black';
    headerContainer.style.backgroundColor = 'rgb(241, 229, 229)';
  }
  const airlineInput = document.querySelector('select');
  if (airlineInput) {
    airlineInput.style.color = 'black';
    headerContainer.style.backgroundColor = 'rgb(241, 229, 229)';
  }

  const navLinks = document.querySelectorAll('li.nav-item.text-center a.nav-link');
  navLinks.forEach(function (link) {
    link.style.color = green;

    link.addEventListener('mouseover', function () {
      link.style.color = brown;
      // Additional styles for the hover state
    });

    link.addEventListener('mouseout', function () {
      link.style.color = green;
      // Additional styles for the non-hover state
    });
  });

  const settingButton = document.querySelector('button.btn.btn-secondary.dropdown-toggle.dropdown-item.nav-link');
  if (settingButton) {
    settingButton.style.color = green;
  }

  settingButton.addEventListener('mouseover', function () {
    settingButton.style.color = brown;
    // Additional styles for the hover state
  });

  settingButton.addEventListener('mouseout', function () {
    settingButton.style.color = green;
    // Additional styles for the non-hover state
  });

  // Remove dark-mode class from body
  document.body.classList.remove('dark-mode');

  // Add light-mode class to body
  document.body.classList.add('light-mode');

  // Update button colors
  updateButtonColors();
  updateMessageBackground();

  // Remove dark mode preference from localStorage
  localStorage.setItem('darkModeEnabled', 'false');
}

// Get the dark/light mode toggle checkbox element
var darkModeToggle = document.getElementById('darkMode');
var lightModeToggle = document.getElementById('lightMode');
var logoImage = document.querySelector('#logo');

// Check if dark mode preference is stored in localStorage
var darkModeEnabled = localStorage.getItem('darkModeEnabled');

// If dark mode preference exists, convert it to a boolean value
if (darkModeEnabled !== null) {
  darkModeEnabled = JSON.parse(darkModeEnabled);

  if (darkModeEnabled) {
    enableDarkMode();
    darkModeToggle.checked = true; // Update the checkbox state
  } else {
    enableLightMode();
    lightModeToggle.checked = true; // Update the checkbox state
  }
}

// Add event listener to the dark mode toggle switch
darkModeToggle.addEventListener('click', function () {
  // Toggle dark mode
  darkModeEnabled = true; // Update the value
  enableDarkMode();
  if (logoImage) {
    logoImage.src = '/logo_images/white.png';
  }
  // Update button colors
  updateButtonColors();
  updateMessageBackground();
});

// Add event listener to the light mode toggle switch
lightModeToggle.addEventListener('click', function () {
  // Toggle light mode
  darkModeEnabled = false; // Update the value
  enableLightMode();
  if (logoImage) {
    logoImage.src = '/logo_images/black.png';
  }
  // Update button colors
  updateButtonColors();
  updateMessageBackground();
});

