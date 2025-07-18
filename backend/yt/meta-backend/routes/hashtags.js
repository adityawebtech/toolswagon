const express = require('express');
const axios = require('axios');
const router = express.Router();

function extractVideoId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

function generateHashtagsFromText(text) {
  const baseWords = text.toLowerCase().split(/[\s\-_,]+/).filter(w => w.length > 2);
  const uniqueWords = [...new Set(baseWords)];
  const hashtags = uniqueWords.map(word => `#${word}`);
  return hashtags.slice(0, 20); // Limit max 20 for quality
}

router.get('/hashtags', async (req, res) => {
  const { url = "", text = "" } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    let finalText = text;
    
    // If YouTube video URL
    const videoId = extractVideoId(url);
    if (videoId && apiKey) {
      const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: videoId,
          key: apiKey
        }
      });

      const video = ytRes.data.items[0];
      if (video?.snippet?.title) {
        finalText = video.snippet.title;
      }
    }

    if (!finalText) {
      return res.status(400).json({ error: 'No valid text or video title found.' });
    }

    // Generate basic hashtags
    const hashtags = generateHashtagsFromText(finalText);
    return res.json({ hashtags });

  } catch (err) {
    console.error("Hashtag generation error:", err.message);
    return res.status(500).json({ error: "Failed to generate hashtags." });
  }
});

module.exports = router;
