document.addEventListener('DOMContentLoaded', () => {
  const words = [
    `<span class="brand-youtube">YouTube</span>`,
    `<span class="brand-instagram">Instagram</span>`,
    `<span class="brand-pinterest">Pinterest</span>`
  ];

  let currentWord = 0;
  let currentChar = 0;
  const typingText = document.getElementById('typing-text');
  const cursor = document.getElementById('cursor');

  function type() {
    const raw = words[currentWord];
    const temp = document.createElement('div');
    temp.innerHTML = raw;
    const plain = temp.textContent;

    if (currentChar <= plain.length) {
      typingText.innerHTML = raw.slice(0, currentChar++);
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1000);
    }
  }

  function erase() {
    const raw = words[currentWord];
    const temp = document.createElement('div');
    temp.innerHTML = raw;
    const plain = temp.textContent;

    if (currentChar >= 0) {
      typingText.innerHTML = raw.slice(0, currentChar--);
      setTimeout(erase, 50);
    } else {
      currentWord = (currentWord + 1) % words.length;
      setTimeout(type, 300);
    }
  }

  type();
});
