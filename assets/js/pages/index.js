document.addEventListener("DOMContentLoaded", () => {
  const rotator = document.getElementById("brand-rotator");
  const items = rotator.children;
  let index = 0;

  function rotate() {
    index = (index + 1) % items.length;
    rotator.style.transform = `translateY(-${index * 48}px)`;
  }

  setInterval(rotate, 2000); // Rotate every 2 seconds
});
