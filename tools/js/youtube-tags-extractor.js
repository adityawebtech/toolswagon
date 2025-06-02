async function extractTags() {
  const input = document.getElementById('youtubeURL');
  const output = document.getElementById('tagsResults');
  const url = input.value.trim();
  const videoId = extractVideoId(url);

  if (!videoId) {
    showToast('Invalid YouTube URL');
    return;
  }

  output.innerHTML = '<p class="text-gray-500">Fetching tags...</p>';

  try {
    const apiKey = 'AIzaSyCVI_V3RtBnrjXufIMcfZFX4VjfAMGrGtw; // Replace with your actual API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const tags = data.items[0].snippet.tags;
      if (tags && tags.length > 0) {
        output.innerHTML = '';
        tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full';
          tagElement.textContent = tag;
          output.appendChild(tagElement);
        });
      } else {
        output.innerHTML = '<p class="text-gray-500">No tags found for this video.</p>';
      }
    } else {
      output.innerHTML = '<p class="text-gray-500">Video not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
    output.innerHTML = '<p class="text-red-500">An error occurred while fetching tags.</p>';
  }
}

function extractVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
