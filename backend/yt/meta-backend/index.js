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

const categoryMap = {
  1: "Film & Animation",
  2: "Autos & Vehicles",
  10: "Music",
  15: "Pets & Animals",
  17: "Sports",
  18: "Short Movies",
  19: "Travel & Events",
  20: "Gaming",
  21: "Videoblogging",
  22: "People & Blogs",
  23: "Comedy",
  24: "Entertainment",
  25: "News & Politics",
  26: "How-to & Style",
  27: "Education",
  28: "Science & Technology",
  29: "Nonprofits & Activism",
  30: "Movies",
  31: "Anime/Animation",
  32: "Action/Adventure",
  33: "Classics",
  34: "Comedy",
  35: "Documentary",
  36: "Drama",
  37: "Family",
  38: "Foreign",
  39: "Horror",
  40: "Sci-Fi/Fantasy",
  41: "Thriller",
  42: "Shorts",
  43: "Shows",
  44: "Trailers"
};

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
      category: categoryMap[Number(snippet.categoryId)] || "Unknown",
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
