<script>
  const toast = document.getElementById("toast");
  const modal = document.getElementById("countdownModal");
  const countdownValue = document.getElementById("countdownValue");
  const cancelBtn = document.getElementById("cancelDownload");
  const fallbackBtn = document.getElementById("fallbackButton");

  let cancelRequested = false;

  function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.className = `fixed top-5 right-5 text-white py-2 px-4 rounded shadow z-50 ${
      isError ? "bg-red-600" : "bg-green-600"
    }`;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }

  function showModal(duration) {
    modal.classList.remove("hidden");
    countdownValue.textContent = duration;
    return new Promise((resolve, reject) => {
      let timeLeft = duration;
      cancelRequested = false;

      const countdownInterval = setInterval(() => {
        if (cancelRequested) {
          clearInterval(countdownInterval);
          modal.classList.add("hidden");
          reject("User cancelled");
        } else {
          timeLeft--;
          countdownValue.textContent = timeLeft;
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            modal.classList.add("hidden");
            resolve();
          }
        }
      }, 1000);
    });
  }

  cancelBtn.addEventListener("click", () => {
    cancelRequested = true;
  });

  async function extractTags() {
    const urlInput = document.getElementById("youtubeURL");
    const tagsResults = document.getElementById("tagsResults");
    const videoURL = urlInput.value.trim();
    const videoId = extractVideoId(videoURL);

    tagsResults.innerHTML = "";

    if (!videoId) {
      showToast("❌ Invalid YouTube URL", true);
      fallbackBtn.classList.remove("hidden");
      return;
    }

    try {
      await showModal(5);

      const apiKey = "AIzaSyCVI_V3RtBnrjXufIMcfZFX4VjfAMGrGtw"; // Replace with your YouTube API Key
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        showToast("❌ Video not found or no data available", true);
        fallbackBtn.classList.remove("hidden");
        return;
      }

      const tags = data.items[0].snippet.tags;

      if (tags && tags.length > 0) {
        tagsResults.innerHTML = "";
        tags.forEach((tag) => {
          const tagElement = document.createElement("span");
          tagElement.className =
            "inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full";
          tagElement.textContent = tag;
          tagsResults.appendChild(tagElement);
        });
        showToast("✅ Tags extracted successfully!");
        fallbackBtn.classList.add("hidden");
      } else {
        showToast("⚠️ No tags found in the video", true);
        fallbackBtn.classList.remove("hidden");
      }
    } catch (error) {
      console.error(error);
      showToast("⚠️ Something went wrong!", true);
      fallbackBtn.classList.remove("hidden");
    }
  }
</script>
