const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ✅ added

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ added

app.get('/', (req, res) => {
  res.send('YouTube Meta Data API is running ✅');
});

app.get('/api/meta', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
