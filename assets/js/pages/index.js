document.addEventListener('DOMContentLoaded', () => {
  const words = ['YouTube', 'Instagram', 'Pinterest'];
  let currentWord = 0;
  let currentChar = 0;
  const typingText = document.getElementById('typing-text');
  const cursor = document.getElementById('cursor');

  function type() {
    if (!typingText) return;

    if (currentChar <= words[currentWord].length) {
      typingText.textContent = words[currentWord].slice(0, currentChar++);
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1200);
    }
  }

  function erase() {
    if (currentChar >= 0) {
      typingText.textContent = words[currentWord].slice(0, currentChar--);
      setTimeout(erase, 50);
    } else {
      currentWord = (currentWord + 1) % words.length;
      setTimeout(type, 300);
    }
  }

  type();
});
