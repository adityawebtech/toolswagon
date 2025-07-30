const express = require("express");
const axios = require("axios");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

function isYouTubeUrl(input) {
  return /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/.test(input);
}

function extractVideoId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function generateSmartTags(query) {
  const baseTags = ["viral", "trending", "2025", "shorts", "video", "song", "music"];
  const words = query
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(word => word.length > 2);

  let generated = [...new Set([...words, ...words.map(w => w + " song"), ...baseTags])];
  
  // Remove duplicates and trim to fit under 500 characters
  let result = [];
  let totalLength = 0;
  for (let tag of generated) {
    if (totalLength + tag.length + 1 <= 500) {
      result.push(tag);
      totalLength += tag.length + 1;
    }
  }
  return result;
}

router.post("/extract-tags", async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    if (isYouTubeUrl(query)) {
      const videoId = extractVideoId(query);
      if (!videoId) {
        return res.status(400).json({ error: "Invalid YouTube URL." });
      }

      // Fetch tags from YouTube video
      const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: "snippet",
          id: videoId,
          key: YOUTUBE_API_KEY
        }
      });

      const video = data.items?.[0];
      const tags = video?.snippet?.tags || [];
      const limitedTags = tags.filter(tag => tag.length <= 30); // prevent very long tags

      // Ensure 500 char max
      let finalTags = [];
      let charCount = 0;
      for (let tag of limitedTags) {
        if (charCount + tag.length + 1 <= 500) {
          finalTags.push(tag);
          charCount += tag.length + 1;
        } else {
          break;
        }
      }

      return res.json({ tags: finalTags });
    } else {
      // Generate smart tags from keyword or title
      const tags = generateSmartTags(query);
      return res.json({ tags });
    }
  } catch (err) {
    console.error("Tag generation error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
