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


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function showModal(seconds, onConfirm, onCancel) {
  const modal = document.getElementById("countdownModal");
  const countdownEl = document.getElementById("countdownValue");
  const cancelBtn = document.getElementById("cancelDownload");

  modal.classList.remove("hidden");
  countdownEl.textContent = seconds;

  let interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      modal.classList.add("hidden");
      onConfirm();
    }
  }, 1000);

  cancelBtn.onclick = () => {
    clearInterval(interval);
    modal.classList.add("hidden");
    onCancel();
  };
}

function extractYouTubeVideoID(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function generateThumbnails() {
  const url = document.getElementById("youtubeURL").value.trim();
  const videoID = extractYouTubeVideoID(url);
  const resultArea = document.getElementById("thumbnailResults");

  if (!videoID) {
    showToast("Invalid YouTube URL. Please try again.");
    return;
  }

  resultArea.innerHTML = '<div class="loader my-6"></div>';

  setTimeout(() => displayThumbnails(videoID), 500); // Optional: simulate loading delay
}

function displayThumbnails(videoID) {
  const resultArea = document.getElementById("thumbnailResults");
  resultArea.innerHTML = "";

  const baseURL = `https://img.youtube.com/vi/${videoID}`;
  const thumbnails = [
    { label: "Default", url: `${baseURL}/default.jpg` },
    { label: "Medium Quality", url: `${baseURL}/mqdefault.jpg` },
    { label: "High Quality", url: `${baseURL}/hqdefault.jpg` },
    { label: "Standard Definition", url: `${baseURL}/sddefault.jpg` },
    { label: "Maximum Resolution", url: `${baseURL}/maxresdefault.jpg` }
  ];

  thumbnails.forEach((thumb) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-lg p-4 text-center border";

    const img = document.createElement("img");
    img.src = thumb.url;
    img.alt = thumb.label;
    img.className = "w-full h-auto mb-4 rounded shadow";

    const label = document.createElement("p");
    label.textContent = thumb.label;
    label.className = "font-semibold text-gray-700 mb-2";

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.className = "inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded";

    downloadBtn.onclick = () => {
      showModal(15, () => {
        const link = document.createElement("a");
        link.href = thumb.url;
        link.download = `${videoID}_${thumb.label.replace(/\s+/g, "_")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast("Download started!");
        window.location.href = "https://toolswagon.site/tools/";
      }, () => {
        document.getElementById("fallbackButton").classList.remove("hidden");
      });
    };

    card.appendChild(img);
    card.appendChild(label);
    card.appendChild(downloadBtn);
    resultArea.appendChild(card);
  });
}
