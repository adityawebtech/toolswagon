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
  const reviewTrack = document.querySelector(".review-track");
  const reviews = document.querySelectorAll(".review-card");
  let index = 0;

  function slideReviews() {
    index++;
    if (index >= reviews.length) {
      index = 0;
    }
    const width = reviews[0].offsetWidth;
    reviewTrack.style.transform = `translateX(-${index * width}px)`;
  }

  setInterval(slideReviews, 4000);
});
