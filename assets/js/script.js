// Dynamically load header and footer
document.getElementById('header-container').innerHTML = await fetch('/components/header.html').then(res => res.text());
document.getElementById('footer-container').innerHTML = await fetch('/components/footer.html').then(res => res.text());

// Update active nav link based on current URL
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || (link.getAttribute('href') === '/' && currentPath === '/index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Search icon toggle functionality
function initSearchToggle() {
  const searchIcon = document.getElementById('search-icon');
  const searchInput = document.getElementById('search-input');

  searchIcon.addEventListener('click', () => {
    if (searchInput.classList.contains('expanded')) {
      searchInput.classList.remove('expanded');
      searchInput.value = '';
    } else {
      searchInput.classList.add('expanded');
      searchInput.focus();
    }
  });

  // Optional: Collapse search on blur
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      searchInput.classList.remove('expanded');
      searchInput.value = '';
    }, 200);
  });
}

// Run after header/footer loaded
async function initPage() {
  // Wait for header and footer to be loaded into DOM
  await new Promise(r => setTimeout(r, 100));  // slight delay to ensure elements exist

  setActiveNavLink();
  initSearchToggle();

  // Update footer year dynamically
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

initPage();
