document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const caseButtons = document.querySelectorAll(".case-btn");

  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
  }

  caseButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const caseType = btn.getAttribute("data-case");
      const text = inputText.value;

      if (!text.trim()) {
        outputText.value = "";
        return;
      }

      let converted = "";
      switch (caseType) {
        case "uppercase":
          converted = text.toUpperCase();
          break;
        case "lowercase":
          converted = text.toLowerCase();
          break;
        case "titlecase":
          converted = toTitleCase(text);
          break;
        case "sentencecase":
          converted = toSentenceCase(text);
          break;
      }
      outputText.value = converted;
    });
  });

  copyBtn.addEventListener("click", () => {
    if (!outputText.value.trim()) return;
    navigator.clipboard.writeText(outputText.value).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
    });
  });

  clearBtn.addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
  });
});
