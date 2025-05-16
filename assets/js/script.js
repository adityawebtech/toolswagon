// Tool Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const toolCards = document.querySelectorAll(".tool-card");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    toolCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Optional: Smooth scroll for review slider (on drag)
const reviewSlider = document.getElementById("reviewSlider");
let isDown = false;
let startX;
let scrollLeft;

reviewSlider.addEventListener("mousedown", (e) => {
  isDown = true;
  reviewSlider.classList.add("grabbing");
  startX = e.pageX - reviewSlider.offsetLeft;
  scrollLeft = reviewSlider.scrollLeft;
});

reviewSlider.addEventListener("mouseleave", () => {
  isDown = false;
  reviewSlider.classList.remove("grabbing");
});

reviewSlider.addEventListener("mouseup", () => {
  isDown = false;
  reviewSlider.classList.remove("grabbing");
});

reviewSlider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - reviewSlider.offsetLeft;
  const walk = (x - startX) * 2; // Speed
  reviewSlider.scrollLeft = scrollLeft - walk;
});
