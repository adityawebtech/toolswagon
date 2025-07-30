const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route: GET /api/tags?videoId=VIDEO_ID
router.get('/tags', async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId' });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const items = response.data.items;
    if (!items || items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const snippet = items[0].snippet;

    res.json({
      title: snippet.title,
      description: snippet.description,
      tags: snippet.tags || [],
      publishedAt: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      thumbnail: snippet.thumbnails?.medium?.url || ''
    });

  } catch (err) {
    console.error('YouTube API Error:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Something went wrong',
      details: err.response?.data?.error?.message || err.message
    });
  }
});

module.exports = router;
