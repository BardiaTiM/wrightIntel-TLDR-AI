const starCheckbox = document.querySelector('.star-checkbox');
const starText = document.querySelector('.star-text');

starCheckbox.addEventListener('change', () => {
  starText.textContent = starCheckbox.checked ? 'Star Clicked!' : 'Click the star!';
});