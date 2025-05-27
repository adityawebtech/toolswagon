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
// Auto-slide reviews
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("reviewSlider");
  const total = slider.children.length;
  let index = 0;

  function showNext() {
    index = (index + 1) % total;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(showNext, 3000);
});

//Search Bar

  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("toolSearch");
    const searchButton = document.getElementById("searchButton");
    const toolCards = document.querySelectorAll(".tool-card");

    function filterTools() {
      const query = searchInput.value.toLowerCase().trim();
      toolCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? "block" : "none";
      });
    }

    // Live filtering on typing
    searchInput.addEventListener("input", filterTools);
  });

// Star Rating Star Script 

  const stars = document.querySelectorAll('#starRating span');
  const ratingText = document.getElementById('ratingValue');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('selected');
      }
      ratingText.textContent = `You rated this tool ${index + 1} out of 5`;
    });
  });
