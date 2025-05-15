// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
      setActiveNavLink(); // Highlight the active nav
    });

  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});

// Highlight the active navigation link
function setActiveNavLink() {
  const links = document.querySelectorAll("#header-placeholder nav a");
  const currentPath = location.pathname;
  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("text-primary", "font-semibold");
    } else {
      link.classList.remove("text-primary", "font-semibold");
    }
  });
}
