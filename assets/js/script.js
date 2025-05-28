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

// Follow Button 

(function () {
  if (window.followWidgetAppended) return;
  window.followWidgetAppended = true;

  const style = document.createElement('style');
  style.textContent = `
    .follow-us-slider {
      position: fixed;
      right: -280px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      color: #111827;
      padding: 18px 16px;
      border-left: 4px solid #2563eb;
      border-radius: 12px 0 0 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transition: right 0.4s ease;
      z-index: 9999;
      width: 250px;
      font-family: 'Segoe UI', sans-serif;
    }
    .follow-us-slider.show {
      right: 0;
    }
    .follow-us-slider h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 12px;
      text-align: center;
      color: #1f2937;
    }
    .follow-us-slider a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #111827;
      text-decoration: none;
      margin: 10px 0;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .follow-us-slider a:hover {
      color: #2563eb;
    }
    .follow-us-slider a img {
      width: 22px;
      height: 22px;
    }
    .follow-us-close {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 20px;
      color: #6b7280;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const slider = document.createElement('div');
  slider.className = 'follow-us-slider';
  slider.innerHTML = `
    <div class="follow-us-close" title="Close">&times;</div>
    <h3>Follow Us for Updates</h3>
    <a href="https://whatsapp.com/channel/0029VbAhDlmAYlUFo8RuCi38" target="_blank" rel="noopener">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" /> WhatsApp
    </a>
    <a href="https://t.me/toolswagon" target="_blank" rel="noopener">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram" /> Telegram
    </a>
    <a href="https://x.com/awtaditya?t=Uy1WjgVQSFUXKvZJ5j9lNg&s=09" target="_blank" rel="noopener">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X" /> X (Twitter)
    </a>
    <a href="https://www.instagram.com/adityaxtalks?igsh=MW12ZTVsbnh0emI5Ng==" target="_blank" rel="noopener">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" /> Instagram
    </a>
  `;
  document.body.appendChild(slider);

  const showSlider = () => slider.classList.add('show');
  const hideSlider = () => slider.classList.remove('show');

  // Show after 5 seconds
  setTimeout(showSlider, 2000);

  // Close handler with auto re-show
  slider.querySelector('.follow-us-close').addEventListener('click', () => {
    hideSlider();
    setTimeout(showSlider, 8000); // Auto show after 15 seconds
  });

  // Scroll behavior
  let lastScrollY = window.scrollY;
  let scrollTimer = null;
  let cooldownTimer = null;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollTimer) clearTimeout(scrollTimer);
    if (cooldownTimer) return;

    if (scrollY < lastScrollY) {
      scrollTimer = setTimeout(() => {
        hideSlider();
        cooldownTimer = setTimeout(() => {
          showSlider();
          cooldownTimer = null;
        }, 10000);
      }, 5000);
    } else {
      if (!slider.classList.contains('show')) {
        scrollTimer = setTimeout(showSlider, 5000);
      }
    }

    lastScrollY = scrollY;
  });
})();
