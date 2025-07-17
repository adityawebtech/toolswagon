const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/monetization-checker', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'YouTube channel URL is required' });

  try {
    const channelId = extractChannelId(url); // your own logic here
    const apiKey = process.env.YOUTUBE_API_KEY;

    const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'snippet,monetizationDetails',
        id: channelId,
        key: apiKey
      }
    });

    const data = ytRes.data.items[0];
    const isMonetized = true; // You should validate using your logic or scraping/partnership data

    res.json({
      channelTitle: data.snippet?.title,
      thumbnail: data.snippet?.thumbnails?.default?.url,
      isMonetized
    });
  } catch (err) {
    console.error("Monetization Checker Error:", err.message);
    res.status(500).json({ error: 'Failed to fetch monetization data' });
  }
});

module.exports = router;
