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

// FOLLOW US SLIDER - APPEARS AFTER 5 SECONDS
(function () {
  if (window.followWidgetAppended) return;
  window.followWidgetAppended = true;

  // Add style
  const style = document.createElement('style');
  style.textContent = `
    .follow-us-slider {
      position: fixed;
      right: -250px;
      top: 50%;
      transform: translateY(-50%);
      background: #2563eb;
      color: white;
      padding: 16px;
      border-radius: 8px 0 0 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      transition: right 0.5s ease;
      z-index: 9999;
      width: 200px;
    }
    .follow-us-slider.show {
      right: 0;
    }
    .follow-us-slider h3 {
      margin-top: 0;
      font-size: 1.1rem;
      margin-bottom: 8px;
      text-align: center;
    }
    .follow-us-slider a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      text-decoration: none;
      margin: 8px 0;
      font-weight: 500;
    }
    .follow-us-slider a img {
      width: 20px;
      height: 20px;
    }
  `;
  document.head.appendChild(style);

  // Create slider
  const slider = document.createElement('div');
  slider.className = 'follow-us-slider';
  slider.innerHTML = `
    <h3>Follow Us</h3>
    <a href="https://wa.me/your-number" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"> WhatsApp</a>
    <a href="https://x.com/yourhandle" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"> X</a>
    <a href="https://t.me/yourchannel" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"> Telegram</a>
    <a href="https://www.youtube.com/@yourchannel" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"> YouTube</a>
    <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"> Instagram</a>
  `;
  document.body.appendChild(slider);

  // Show after 5 seconds
  setTimeout(() => {
    slider.classList.add('show');
  }, 5000);
})();
