const express = require("express");
const axios = require("axios");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YT_API_KEY;

// Extract video ID from a standard YouTube URL
function extractVideoId(url) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Limit tags to 500 characters
function limitTags(tagsArray) {
  const result = [];
  let currentLength = 0;
  for (const tag of tagsArray) {
    const next = tag.trim();
    if (currentLength + next.length + 2 > 500) break;
    result.push(next);
    currentLength += next.length + 2;
  }
  return result;
}

// Simple tag generator using keywords
function generateSmartTags(query) {
  const base = query.toLowerCase().split(" ");
  const extra = [
    "2025", "viral", "trending", "official", "new", "top", "hits", "shorts", "4k", "remix",
    "music", "video", "status", "edits", "song", "beats", "instrumental", "reel"
  ];

  const merged = [...new Set([...base, ...extra, ...base.map(word => `${word} song`)])];
  return limitTags(merged);
}

router.post("/extract-tags", async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query is required." });
  }

  // Check if it's a YouTube URL
  const videoId = extractVideoId(query.trim());
  if (videoId) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      const response = await axios.get(url);

      const tags = response.data?.items?.[0]?.snippet?.tags || [];
      return res.json({ tags: limitTags(tags) });
    } catch (error) {
      console.error("YouTube API Error:", error.message);
      return res.status(500).json({ error: "Failed to fetch video tags from YouTube API." });
    }
  }

  // Fallback to keyword/title-based tag generation
  const smartTags = generateSmartTags(query);
  return res.json({ tags: smartTags });
});

module.exports = router;
