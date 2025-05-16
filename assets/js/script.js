// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
      initMobileMenu(); // initialize after loading
    });

  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });
});

//Mobile Toggle

function initMobileMenu() {
  const toggleBtn = document.getElementById("menuToggle"); // match ID here
  const mobileMenu = document.getElementById("mobileMenu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Review Slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("reviewSlider");
  const reviews = slider.children;
  let currentIndex = 0;

  function showNextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(showNextReview, 3000); // 3 seconds
});
