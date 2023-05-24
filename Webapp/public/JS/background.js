// Function to enable dark mode
function enableDarkMode() {
    // Set background gradient for dark mode
    document.body.style.background = '#F4C397';
    // document.body.style.backgroundSize = '400% 500%';
    // document.body.style.animation = 'gradient 10s ease infinite';
  
    // Change font color to white
    document.body.style.color = 'white';
  
    // Change header and footer background and font color
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    if (header) {
      header.style.background = '#212121';
      header.style.color = 'white';
    }
    if (footer) {
      footer.style.background = 'rgb(241, 229, 229)';
      footer.style.color = 'white';
    }
  
    // Set logo for dark mode
    var logoImage = document.querySelector('.logo');
    if (logoImage) {
      logoImage.src = 'logo-white.png';
    }
  
    // Remove light mode class from body
    document.body.classList.remove('light-mode');
  
    // Store dark mode preference in localStorage
    localStorage.setItem('darkModeEnabled', 'true');
  }
  
  // Function to enable light mode
  function enableLightMode() {
    // Set background gradient for light mode #F4C397
    document.body.style.background = '#F4C397';
    // document.body.style.backgroundSize = '400% 500%';
    // document.body.style.animation = 'gradient 10s ease infinite';
  
    // Change font color to black
    document.body.style.color = 'black';
  
    // Change header and footer background and font color
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    if (header) {
      header.style.background = '#212121';
      header.style.color = 'black';
    }
    if (footer) {
      footer.style.background = 'rgb(241, 229, 229)';
      footer.style.color = 'black';
    }
  
    // Set logo for light mode
    var logoImage = document.querySelector('.logo');
    if (logoImage) {
      logoImage.src = 'logo-black.png';
    }
  
    // Add light-mode class to body
    document.body.classList.add('light-mode');
  
    // Remove dark mode preference from localStorage
    localStorage.setItem('darkModeEnabled', 'false');
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
      // darkModeToggle.checked = true; // Update the checkbox state
    } else {
      enableLightMode();
      lightModeToggle.checked = true; // Update the checkbox state
    }
  }
  
  // // Add event listener to the dark mode toggle switch
  // darkModeToggle.addEventListener('click', function() {
  //   // Toggle dark mode
  //   darkModeEnabled = true; // Update the value
  //   enableDarkMode();
  //   logoImage.src = 'logo-white.png';
  // });
  
  // Add event listener to the light mode toggle switch
  // lightModeToggle.addEventListener('click', function() {
  //   // Toggle light mode
  //   darkModeEnabled = false; // Update the value
  //   enableLightMode();
  //   logoImage.src = 'logo-black.png';
  // });
  