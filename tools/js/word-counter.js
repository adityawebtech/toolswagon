
const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const wordFrequency = document.getElementById('wordFrequency');
    const exportBtn = document.getElementById('exportBtn');

    textInput.addEventListener('input', () => {
      const text = textInput.value;
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      wordCount.textContent = words.length;
      charCount.textContent = text.length;

      const frequency = {};
      words.forEach(word => {
        const cleaned = word.toLowerCase().replace(/[^\w']/g, '');
        if (cleaned) {
          frequency[cleaned] = (frequency[cleaned] || 0) + 1;
        }
      });

      wordFrequency.innerHTML = '';
      Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, count]) => {
          const li = document.createElement('li');
          li.textContent = `${word}: ${count}`;
          wordFrequency.appendChild(li);
        });
    });

    exportBtn.addEventListener('click', () => {
      const blob = new Blob([textInput.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'word-counter-output.txt';
      a.click();
      URL.revokeObjectURL(url);
    });

  const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
  textInput.value = '';
  wordCount.textContent = '0';
  charCount.textContent = '0';
  wordFrequency.innerHTML = '';
});
