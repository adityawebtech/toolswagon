const express = require('express');
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('YouTube Meta Data API is running ✅');
});

app.get('/api/meta', async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!data.items || !data.items.length)
      return res.status(404).json({ error: 'Video not found' });

    const info = data.items[0].snippet;

    res.json({
      thumbnail: info.thumbnails.medium.url,
      title: info.title,
      description: info.description,
      publishedAt: info.publishedAt,
      categoryId: info.categoryId
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
