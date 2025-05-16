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

// Initialize mobile menu toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Scroll review slider (optional buttons logic)
const reviewSlider = document.querySelector(".review-slider");
let isDown = false;
let startX;
let scrollLeft;

if (reviewSlider) {
  reviewSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    reviewSlider.classList.add("active");
    startX = e.pageX - reviewSlider.offsetLeft;
    scrollLeft = reviewSlider.scrollLeft;
  });
  reviewSlider.addEventListener("mouseleave", () => {
    isDown = false;
    reviewSlider.classList.remove("active");
  });
  reviewSlider.addEventListener("mouseup", () => {
    isDown = false;
    reviewSlider.classList.remove("active");
  });
  reviewSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - reviewSlider.offsetLeft;
    const walk = (x - startX) * 2;
    reviewSlider.scrollLeft = scrollLeft - walk;
  });
}
