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
      showModal(15, async () => {
        try {
          const response = await fetch(thumb.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = `${videoID}_${thumb.label.replace(/\s+/g, "_")}.jpg`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);

          window.location.href = "https://toolswagon.site/tools/";
        } catch (err) {
          showToast("Download failed. Please try again.");
        }
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
