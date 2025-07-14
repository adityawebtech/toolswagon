<script>
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
      setTimeout(typeLoop, 120);
    } else if (!isErasing) {
      isErasing = true;
      setTimeout(typeLoop, 1000);
    } else if (isErasing && currentChar >= 0) {
      typingText.innerHTML = `<span class="${wordObj.class}">${fullText.substring(0, currentChar)}</span>`;
      currentChar--;
      setTimeout(typeLoop, 60);
    } else {
      isErasing = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typeLoop, 300);
    }
  }

  typeLoop();
});
</script>
