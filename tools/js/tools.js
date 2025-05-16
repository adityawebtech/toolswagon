// TEXT CASE CONVERTER TOOL NO.1

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

// PDF TO WORD CONVERTER TOOL No. 2

async function convertPDFToWord() {
  const fileInput = document.getElementById("pdfFile");
  const result = document.getElementById("conversionResult");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput.files.length) {
    alert("Please upload a PDF file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("https://pdf-to-word-api-315i.onrender.com", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to convert PDF");
    }

    // Convert response to a blob and create download link
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "converted.docx";
    result.classList.remove("hidden");
  } catch (error) {
    alert("Conversion failed. Please try again.");
    console.error(error);
  }
}
