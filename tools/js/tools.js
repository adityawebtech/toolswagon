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
      const status = document.getElementById("status");
      status.textContent = "";

      if (!fileInput.files.length) {
        alert("Please upload a PDF file first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      status.textContent = "Converting... Please wait.";

      try {
        const response = await fetch("https://pdf-to-word-api-315i.onrender.com", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "converted.docx";
          document.body.appendChild(a);
          a.click();
          a.remove();
          status.textContent = "Download started!";
        } else {
          status.textContent = "Conversion failed. Please try again.";
        }
      } catch (error) {
        console.error(error);
        status.textContent = "An error occurred: " + error.message;
      }
    }

// YOUTUBE THUMBNAIL DOWNLOADER TOOL SCRIPT

function fetchThumbnails() {
      const url = document.getElementById("youtubeUrl").value.trim();
      const videoID = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
      if (!videoID) return alert("Invalid YouTube URL");

      const baseUrl = `https://img.youtube.com/vi/${videoID}`;
      const hd = `${baseUrl}/maxresdefault.jpg`;
      const sd = `${baseUrl}/sddefault.jpg`;
      const mq = `${baseUrl}/mqdefault.jpg`;

      document.getElementById("thumbHD").src = hd;
      document.getElementById("thumbSD").src = sd;
      document.getElementById("thumbMQ").src = mq;

      document.getElementById("downloadHD").href = hd;
      document.getElementById("downloadSD").href = sd;
      document.getElementById("downloadMQ").href = mq;

      document.getElementById("thumbnails").classList.remove("hidden");
}
