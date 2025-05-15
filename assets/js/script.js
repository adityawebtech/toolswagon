document.addEventListener("DOMContentLoaded", () => {
  const basePath = "/toolswagon"; // your GitHub repo name

  fetch(`${basePath}/components/header.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  fetch(`${basePath}/components/footer.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
