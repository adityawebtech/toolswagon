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
      typingText.textContent = fullText.substring(0, currentChar);
      typingText.className = wordObj.class; // Apply class during typing
      currentChar++;
      setTimeout(typeLoop, 180);
    } else if (!isErasing) {
      setTimeout(() => {
        isErasing = true;
        typeLoop();
      }, 1500);
    } else if (isErasing && currentChar >= 0) {
      typingText.textContent = fullText.substring(0, currentChar);
      currentChar--;
      setTimeout(typeLoop, 80);
    } else {
      isErasing = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typeLoop, 500);
    }
  }

  typeLoop();
});
