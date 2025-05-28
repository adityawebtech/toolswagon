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
    .follow-button-sticky {
      position: fixed;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: #2563eb;
      color: #fff;
      padding: 10px 12px;
      border-radius: 0 8px 8px 0;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Segoe UI', sans-serif;
      z-index: 9999;
      cursor: pointer;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: bounce 1.5s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(-50%) translateX(0); }
      50% { transform: translateY(-50%) translateX(5px); }
    }

    .follow-us-slider {
      position: fixed;
      left: -280px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      color: #111827;
      padding: 18px 16px;
      border-right: 4px solid #2563eb;
      border-radius: 0 12px 12px 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transition: left 0.4s ease;
      z-index: 9998;
      width: 250px;
      font-family: 'Segoe UI', sans-serif;
    }

    .follow-us-slider.show {
      left: 0;
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

  const button = document.createElement('div');
  button.className = 'follow-button-sticky';
  button.innerText = 'Follow\nfor\nUpdates';
  document.body.appendChild(button);

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

  // Toggle panel on button click
  button.addEventListener('click', () => {
    slider.classList.toggle('show');
  });

  // Close button inside slider
  slider.querySelector('.follow-us-close').addEventListener('click', () => {
    slider.classList.remove('show');
  });
})();
