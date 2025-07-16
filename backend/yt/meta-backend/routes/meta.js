const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/meta', async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!data.items || !data.items.length) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const stats = video.statistics;

    res.json({
      thumbnail: snippet.thumbnails.medium.url,
      title: snippet.title,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      categoryId: snippet.categoryId,
      channelTitle: snippet.channelTitle,
      viewCount: stats.viewCount,
      likeCount: stats.likeCount || '0'
    });

  } catch (err) {
    res.status(500).json({
      error: 'Something went wrong',
      details: err.response?.data?.error?.message || err.message
    });
  }
});

module.exports = router;
