document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    fetch("/components/header.html")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        headerContainer.innerHTML = html;

        (function () {
          const menuToggle = document.getElementById("menuToggle");
          const mobileMenu = document.getElementById("mobileMenu");
          let isOpen = false;

          menuToggle?.addEventListener("click", () => {
            isOpen = !isOpen;
            mobileMenu?.classList.toggle("hidden");
            menuToggle.textContent = isOpen ? "✖" : "☰";
          });

          const themeToggle = document.getElementById("themeToggle");
          const themeIcon = document.getElementById("themeIcon");

          function updateIcon(isDark) {
            themeIcon.innerHTML = isDark
              ? '<path fill="currentColor" d="M17.75 15.5A6.75 6.75 0 018.5 6.25a7 7 0 109.25 9.25z"/>'
              : '<path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          }

          function setTheme(isDark) {
            document.documentElement.classList.toggle("dark", isDark);
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateIcon(isDark);
          }

          const storedTheme = localStorage.getItem("theme");
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          setTheme(storedTheme === "dark" || (!storedTheme && prefersDark));

          themeToggle?.addEventListener("click", () => {
            const isCurrentlyDark = document.documentElement.classList.contains("dark");
            setTheme(!isCurrentlyDark);
          });

          const langToggle = document.getElementById("langToggle");
          const langMenu = document.getElementById("langMenu");

          langToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            langMenu?.classList.toggle("hidden");
          });

          document.addEventListener("click", () => {
            if (!langMenu?.classList.contains("hidden")) {
              langMenu?.classList.add("hidden");
            }
          });
        })();
      })
      .catch((err) => console.error("Header load error:", err));
  }

  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    fetch("/components/footer.html")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        footerContainer.innerHTML = html;
      })
      .catch((err) => console.error("Footer load error:", err));
  }

  document.getElementById("bugForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("successMessage")?.classList.remove("hidden");
    this.reset();
  });

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop?.classList.remove("hidden");
    } else {
      backToTop?.classList.add("hidden");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const overlayContainer = document.getElementById("overlay-container");

if (overlayContainer) {
  fetch("/components/overlays.html")
    .then((res) => res.text())
    .then((html) => {
      overlayContainer.innerHTML = html;
    })
    .catch((err) => console.error("Overlay load error:", err));
}
