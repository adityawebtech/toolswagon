document.addEventListener('DOMContentLoaded', () => {
  // Load Header
  const headerPlaceholder = document.getElementById('header-container');
  if (headerPlaceholder) {
    fetch('${basePath}/components/header.html')  // Use relative path
      .then(res => res.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;
        initHeaderFeatures();
      });
  }

  // Load Footer
  const footerPlaceholder = document.getElementById('footer-container');
  if (footerPlaceholder) {
    fetch('${basePath}/components/footer.html')  // Use relative path
      .then(res => res.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      });
  }

  function initHeaderFeatures() {
    // Hamburger Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMenuOpen = false;

    menuToggle?.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu?.classList.toggle('hidden');
      menuToggle.textContent = isMenuOpen ? '✖' : '☰';
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    function updateThemeIcon(isDark) {
      themeIcon.innerHTML = isDark
        ? `<path fill="currentColor" d="M17.75 15.5A6.75 6.75 0 018.5 6.25a7 7 0 109.25 9.25z"/>`
        : `<path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }

    function setDarkMode(isDark) {
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(darkMode);

    themeToggle?.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    });

    // Language Selector
    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');

    langToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu?.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      if (!langMenu?.classList.contains('hidden')) {
        langMenu?.classList.add('hidden');
      }
    });
  }

  // Bug Report Form
  document.getElementById('bugForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('successMessage')?.classList.remove('hidden');
    this.reset();
  });

  // Back to Top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop?.classList.remove('hidden');
    else backToTop?.classList.add('hidden');
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
