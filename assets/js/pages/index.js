document.addEventListener('DOMContentLoaded', () => {
  const words = [
    { text: "YOUTUBE", class: "brand-youtube" },
    { text: "INSTAGRAM", class: "brand-instagram" },
    { text: "PINTEREST", class: "brand-pinterest" }
  ];

  const typingText = document.getElementById('typing-text');
  const cursor = document.getElementById('cursor');

  let currentWordIndex = 0;
  let currentChar = 0;
  let isErasing = false;

  function typeLoop() {
    const wordObj = words[currentWordIndex];
    const fullText = wordObj.text;

    if (!isErasing && currentChar <= fullText.length) {
      typingText.innerHTML = `<span class="${wordObj.class}">${fullText.substring(0, currentChar)}</span>`;
      currentChar++;
      setTimeout(typeLoop, 180); // slower typing
    } else if (!isErasing) {
      isErasing = true;
      setTimeout(typeLoop, 1500); // pause after full word
    } else if (isErasing && currentChar >= 0) {
      typingText.innerHTML = `<span class="${wordObj.class}">${fullText.substring(0, currentChar)}</span>`;
      currentChar--;
      setTimeout(typeLoop, 80); // slower erasing
    } else {
      isErasing = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typeLoop, 500); // pause before next word starts
    }
  }

  typeLoop();
});
