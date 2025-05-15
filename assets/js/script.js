// Adjust path based on current location
const basePath = window.location.pathname.includes("/tools/") ? "../../" : "./";

window.addEventListener("DOMContentLoaded", () => {
  fetch(basePath + "components/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;
      setActiveNav();
    });

  fetch(basePath + "components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    });
});
