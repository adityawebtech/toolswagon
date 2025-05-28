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

// FOLLOW US BUTTON 

// follow-slider.js
(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    #followSlider {
      position: fixed;
      right: -300px;
      top: 30%;
      z-index: 9999;
      background: white;
      border-left: 3px solid #2563EB;
      border-radius: 12px 0 0 12px;
      box-shadow: -2px 2px 15px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      width: 260px;
      transition: right 0.4s ease;
      font-family: sans-serif;
    }
    #followSlider h3 {
      font-size: 16px;
      margin-bottom: 12px;
      color: #111827;
    }
    #followSlider .icons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    #followSlider .icons a {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border-radius: 8px;
      text-decoration: none;
    }
    .wa { background: #25D366; }
    .tw { background: #1DA1F2; }
    .tg { background: #0088cc; }
    .yt { background: #FF0000; }
    .ig { background: #E1306C; }
  `;
  document.head.appendChild(style);

  const slider = document.createElement('div');
  slider.id = 'followSlider';
  slider.innerHTML = `
    <h3>Enjoyed this tool? Follow us 💖</h3>
    <div class="icons">
      <a href="https://wa.me/yourNumber" target="_blank" class="wa" title="WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12.04 2.003c-5.5.003-9.973 4.473-9.97 9.973.002 1.757.46 3.425 1.32 4.907L2.002 22l5.232-1.363c1.44.787 3.06 1.2 4.796 1.2h.004c5.5-.002 9.972-4.474 9.97-9.974-.003-5.5-4.475-9.972-9.974-9.97zm5.7 14.939c-.236.662-1.37 1.278-1.89 1.345-.486.063-1.104.089-1.783-.113-.41-.119-.94-.304-1.622-.596-2.86-1.24-4.728-4.31-4.875-4.514-.143-.205-1.167-1.55-1.167-2.958 0-1.409.74-2.096 1.003-2.38.262-.283.577-.354.77-.354.19 0 .38.002.545.01.175.007.41-.066.642.49.244.58.832 2.002.907 2.145.076.143.126.31.025.497-.1.188-.15.31-.296.474-.146.163-.31.364-.443.49-.144.134-.294.28-.127.55.167.269.743 1.227 1.59 1.988 1.094.974 2.017 1.273 2.288 1.415.27.14.429.118.59-.071.16-.19.677-.786.858-1.054.18-.27.36-.22.602-.133.242.086 1.532.725 1.79.857.26.13.43.195.493.3.062.107.062.63-.174 1.292z"/></svg></a>
      <a href="https://x.com/yourProfile" target="_blank" class="tw" title="X (Twitter)"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.35c.734 0 1.325-.591 1.325-1.324v-21.351c0-.733-.591-1.325-1.325-1.325zm-5.693 8.934l-8.067 9.538h-2.334l8.067-9.538h2.334zm1.993-2.354h-2.326l-2.737 3.236-2.737-3.236h-2.326l4.26 5.019-4.26 5.02h2.326l2.737-3.237 2.737 3.237h2.326l-4.26-5.02 4.26-5.019z"/></svg></a>
      <a href="https://t.me/yourChannel" target="_blank" class="tg" title="Telegram"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M9.036 15.57l-.375 3.772c.537 0 .768-.23 1.048-.505l2.512-2.356 5.207 3.793c.956.527 1.633.25 1.874-.89l3.392-15.928c.309-1.445-.525-2.014-1.439-1.673l-19.74 7.65c-1.35.52-1.334 1.262-.231 1.595l5.042 1.575 11.699-7.376c.55-.36 1.051-.162.638.198l-9.469 8.57z"/></svg></a>
      <a href="https://youtube.com/@yourChannel" target="_blank" class="yt" title="YouTube"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M19.615 3.184c-2.45-.329-12.777-.329-15.227 0-2.404.323-3.388 2.138-3.388 8.816s.984 8.492 3.388 8.816c2.45.329 12.777.329 15.227 0 2.404-.323 3.388-2.138 3.388-8.816s-.984-8.492-3.388-8.816zm-10.615 13.616v-9l8 4.5-8 4.5z"/></svg></a>
      <a href="https://instagram.com/yourProfile" target="_blank" class="ig" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.973.24 2.423.415a4.89 4.89 0 011.675 1.09 4.89 4.89 0 011.09 1.675c.175.45.359 1.253.415 2.423.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.973-.415 2.423a4.9 4.9 0 01-1.09 1.675 4.9 4.9 0 01-1.675 1.09c-.45.175-1.253.359-2.423.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.973-.24-2.423-.415a4.9 4.9 0 01-1.675-1.09 4.9 4.9 0 01-1.09-1.675c-.175-.45-.359-1.253-.415-2.423-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.973.415-2.423a4.89 4.89 0 011.09-1.675 4.89 4.89 0 011.675-1.09c.45-.175 1.253-.359 2.423-.415 1.266-.058 1.646-.07 4.85-.07zm0 1.837c-3.16 0-3.522.012-4.766.068-1.002.048-1.547.213-1.906.355a3.082 3.082 0 00-1.133.743 3.082 3.082 0 00-.743 1.133c-.142.359-.307.904-.355 1.906-.056 1.244-.068 1.606-.068 4.766s.012 3.522.068 4.766c.048 1.002.213 1.547.355 1.906a3.082 3.082 0 00.743 1.133 3.082 3.082 0 001.133.743c.359.142.904.307 1.906.355 1.244.056 1.606.068 4.766.068s3.522-.012 4.766-.068c1.002-.048 1.547-.213 1.906-.355a3.082 3.082 0 001.133-.743 3.082 3.082 0 00.743-1.133c.142-.359.307-.904.355-1.906.056-1.244.068-1.606.068-4.766s-.012-3.522-.068-4.766c-.048-1.002-.213-1.547-.355-1.906a3.082 3.082 0 00-.743-1.133 3.082 3.082 0 00-1.133-.743c-.359-.142-.904-.307-1.906-.355-1.244-.056-1.606-.068-4.766-.068zm0 4.838a5.999 5.999 0 110 12 5.999 5.999 0 010-12zm0 1.837a4.162 4.162 0 100 8.325 4.162 4.162 0 000-8.325zm5.438-1.845a1.335 1.335 0 110 2.67 1.335 1.335 0 010-2.67z"/></svg></a>
    </div>
  `;
  document.body.appendChild(slider);

  let shown = false;

  function showSlider() {
    if (!shown) {
      slider.style.right = '0px';
      shown = true;
    }
  }

  // Desktop exit-intent
  document.addEventListener('mouseout', function (e) {
    if (e.clientY < 50) showSlider();
  });

  // Mobile scroll-up intent
  let lastY = window.pageYOffset;
  window.addEventListener('scroll', function () {
    const currY = window.pageYOffset;
    if (currY < lastY - 50) showSlider();
    lastY = currY;
  });
})();
