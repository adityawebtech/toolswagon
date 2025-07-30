const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");

function generateTagsFromText(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const uniqueTags = [...new Set(words)];
  let charCount = 0;
  const tags = [];

  for (const tag of uniqueTags) {
    if (charCount + tag.length + 2 <= 500) {
      tags.push(tag);
      charCount += tag.length + 2; // comma + space
    } else break;
  }

  return tags;
}

function isYouTubeURL(input) {
  return input.includes("youtube.com") || input.includes("youtu.be");
}

router.post("/extract-tags", async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query is required" });
  }

  if (isYouTubeURL(query)) {
    try {
      const videoId = ytdl.getURLVideoID(query);
      const info = await ytdl.getInfo(videoId);
      const tags = info.videoDetails.keywords || [];
      return res.json({ tags });
    } catch (error) {
      console.error("Error fetching video tags:", error.message);
      return res.status(500).json({ error: "Failed to extract tags from URL" });
    }
  } else {
    const tags = generateTagsFromText(query);
    return res.json({ tags });
  }
});

module.exports = router;
