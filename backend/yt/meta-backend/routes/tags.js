const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/tags?videoId=YOUR_VIDEO_ID
router.get('/tags', async (req, res) => {
  const videoId = req.query.videoId;

  // Validate query parameter
  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId in request query.' });
  }

  try {
    // Construct YouTube API request
    const youtubeAPI = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
    const { data } = await axios.get(youtubeAPI);

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found. Please check the video ID.' });
    }

    const video = data.items[0].snippet;

    // Clean and safe response
    res.json({
      title: video.title || '',
      description: video.description || '',
      tags: video.tags || [],
      publishedAt: video.publishedAt || '',
      channelTitle: video.channelTitle || '',
      thumbnail: video.thumbnails?.medium?.url || ''
    });

  } catch (err) {
    console.error('YouTube Tags API Error:', err.response?.data || err.message);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.response?.data?.error?.message || err.message
    });
  }
});

module.exports = router;
