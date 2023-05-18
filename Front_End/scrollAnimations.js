document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.animated-element');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the element is in the viewport, add the animation
        entry.target.setAttribute('data-aos', 'fade-in');
      } else {
        // If the element is out of the viewport, remove the animation
        entry.target.removeAttribute('data-aos');
      }
      // Update the AOS library to apply the changes
      AOS.refresh();
    });
  }, observerOptions);

  // Observe all elements with the 'animated-element' class
  animatedElements.forEach((element) => observer.observe(element));
});


AOS.init();



/* AIRLINE IMAGES SLIDER ANIMATION */
function scrollDiv() {
  var scrollingDiv = document.getElementById('airlines');
  scrollingDiv.scrollLeft -= 1;

  if (scrollingDiv.scrollLeft <= 0) {
    scrollingDiv.scrollLeft = scrollingDiv.scrollWidth - scrollingDiv.clientWidth;
  }
}

setInterval(scrollDiv, 20); 