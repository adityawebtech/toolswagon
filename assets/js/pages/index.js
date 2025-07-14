document.addEventListener("DOMContentLoaded", () => {
  const brandTexts = document.querySelectorAll("#flip-text .brand-text");
  let current = 0;

  setInterval(() => {
    brandTexts[current].classList.remove("opacity-100");
    brandTexts[current].classList.add("opacity-0");

    current = (current + 1) % brandTexts.length;

    brandTexts[current].classList.remove("opacity-0");
    brandTexts[current].classList.add("opacity-100");
  }, 2500);
});
