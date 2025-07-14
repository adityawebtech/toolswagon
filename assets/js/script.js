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
  padding: 10px 6px;
  border-radius: 0 10px 10px 0;
  font-size: 14px;
  font-weight: 800;
  font-family: 'Segoe UI', sans-serif;
  z-index: 9999;
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: bounce 1.5s infinite;
  height: 120px;
  width: 24px;
  text-align: center;
  white-space: nowrap;
  line-height: 1;
  overflow: hidden;
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
  button.innerText = 'Follow Us';
  document.body.appendChild(button);

  const slider = document.createElement('div');
  slider.className = 'follow-us-slider';
  slider.innerHTML = `
    <div class="follow-us-close" title="Close">&times;</div>
    <u><h3>Follow ToolsWagon for Updates</h3></u>
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

  // Open slider and hide button
  button.addEventListener('click', () => {
    slider.classList.add('show');
    button.style.display = 'none';
  });

  // Close slider and show button again
  slider.querySelector('.follow-us-close').addEventListener('click', () => {
    slider.classList.remove('show');
    button.style.display = 'block';
  });
})();

    // Bug Report Form
    document.getElementById('bugForm')?.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('successMessage').classList.remove('hidden');
      this.reset();
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backToTop.classList.remove('hidden');
      else backToTop.classList.add('hidden');
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function setDarkMode(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.innerHTML = isDark
      ? `<path fill="currentColor" d="M17.75 15.5A6.75 6.75 0 018.5 6.25a7 7 0 109.25 9.25z"/>` // Moon
      : `<path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`; // Sun
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
  setDarkMode(darkMode);

  themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  });
});
