<script>
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  document.getElementById('darkModeToggle')?.addEventListener('click', toggleDark);
  document.getElementById('darkModeToggleMobile')?.addEventListener('click', toggleDark);
</script>
