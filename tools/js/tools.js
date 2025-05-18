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

function extractYouTubeID(url) {
      const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

    function generateThumbnails() {
      const url = document.getElementById("youtubeURL").value;
      const videoID = extractYouTubeID(url);
      const resultArea = document.getElementById("thumbnailResults");

      if (!videoID) {
        alert("Please enter a valid YouTube URL.");
        return;
      }

      const base = `https://img.youtube.com/vi/${videoID}`;
      const thumbnails = [
        { label: "HD (maxresdefault)", url: `${base}/maxresdefault.jpg` },
        { label: "SD (sddefault)", url: `${base}/sddefault.jpg` },
        { label: "Medium (mqdefault)", url: `${base}/mqdefault.jpg` },
        { label: "High (hqdefault)", url: `${base}/hqdefault.jpg` },
        { label: "Default (default)", url: `${base}/default.jpg` },
        { label: "Start Frame (0.jpg)", url: `${base}/0.jpg` },
        { label: "Second Frame (1.jpg)", url: `${base}/1.jpg` },
        { label: "Third Frame (2.jpg)", url: `${base}/2.jpg` },
        { label: "Fourth Frame (3.jpg)", url: `${base}/3.jpg` }
      ];

      resultArea.innerHTML = "";

      thumbnails.forEach(thumb => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-lg p-4 text-center border";

        const img = document.createElement("img");
        img.src = thumb.url;
        img.alt = thumb.label;
        img.className = "w-full h-auto mb-4 rounded shadow";

        const label = document.createElement("p");
        label.textContent = thumb.label;
        label.className = "font-semibold text-gray-700 mb-2";

        const downloadBtn = document.createElement("a");
        downloadBtn.href = thumb.url;
        downloadBtn.download = `${videoID}_${thumb.label.replace(/\s+/g, "_")}.jpg`;
        downloadBtn.textContent = "Download";
        downloadBtn.className = "inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded";

        card.appendChild(img);
        card.appendChild(label);
        card.appendChild(downloadBtn);
        resultArea.appendChild(card);
      });

      // Optional: Scroll to results
      resultArea.scrollIntoView({ behavior: "smooth" });
    }
