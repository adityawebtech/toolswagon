document.addEventListener('DOMContentLoaded', () => {
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

  // Initialize toggle based on current theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  updateThemeIcon(isDark);

  // Toggle on click
  themeToggle?.addEventListener('click', () => {
    const currentlyDark = document.documentElement.classList.contains('dark');
    setDarkMode(!currentlyDark);
  });
});
