const express = require('express');
const axios = require('axios');
const router = express.Router();

const extractVideoId = (url) => {
  const match = url.match(/(?:v=|\\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

router.get('/hashtags', async (req, res) => {
  const { url, text } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    let queryText = text;

    if (url) {
      const videoId = extractVideoId(url);
      if (!videoId) return res.status(400).json({ error: 'Invalid YouTube video URL.' });

      const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet',
          id: videoId,
          key: apiKey
        }
      });

      const video = ytRes.data.items[0];
      if (!video) return res.status(404).json({ error: 'Video not found.' });

      queryText = `${video.snippet.title} ${video.snippet.description}`;
    }

    if (!queryText) return res.status(400).json({ error: 'No input text provided.' });

    // Simulate AI/ML response
    const keywords = queryText
      .split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 10)
      .map(word => '#' + word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

    const uniqueHashtags = [...new Set(keywords)];

    res.json({ hashtags: uniqueHashtags.length ? uniqueHashtags : ['#youtube', '#hashtag', '#generator'] });

  } catch (err) {
    console.error('Hashtag Error:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
