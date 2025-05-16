document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("/components/header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Header load failed");
      return response.text();
    })
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;
      setActiveNavLink();
    })
    .catch((err) => {
      console.error(err);
    });

  // Load Footer
  fetch("/components/footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Footer load failed");
      return response.text();
    })
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
});

// Highlight active nav link based on current path
function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  const path = window.location.pathname;

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === path || (path === "/" && link.getAttribute("href") === "/")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
