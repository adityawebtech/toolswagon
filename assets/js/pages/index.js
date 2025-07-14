document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typing-text");
  const words = [" YouTube ", " Instagram ", " Pinterest "];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    const visibleText = currentWord.substring(0, charIndex);
    typingElement.textContent = visibleText;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 120);
      } else {
        isDeleting = true;
        setTimeout(type, 1000);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(type, 60);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
      }
    }
  }

  type();
});
