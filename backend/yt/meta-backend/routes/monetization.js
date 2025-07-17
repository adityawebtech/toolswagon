const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/monetization-checker', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'YouTube channel URL is required' });

  try {
    // Use your existing channel-id API or extract here
    const channelId = await getChannelIdFromUrl(url);
    if (!channelId) return res.status(400).json({ error: 'Invalid YouTube channel URL' });

    const apiKey = process.env.YOUTUBE_API_KEY;
    const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
        key: apiKey
      }
    });

    const data = ytRes.data.items[0];
    if (!data) return res.status(404).json({ error: 'Channel not found' });

    const stats = data.statistics;
    const snippet = data.snippet;

    const subscriberCount = parseInt(stats.subscriberCount || '0');
    const videoCount = parseInt(stats.videoCount || '0');
    const viewCount = parseInt(stats.viewCount || '0');

    const isMonetized = subscriberCount >= 1000 && viewCount >= 10000 && videoCount >= 3;

    res.json({
      channelTitle: snippet.title,
      thumbnail: snippet.thumbnails?.default?.url || '',
      isMonetized,
      subscriberCount,
      viewCount,
      videoCount
    });

  } catch (err) {
    console.error("Monetization Checker Error:", err.message);
    res.status(500).json({ error: 'Failed to fetch monetization data' });
  }
});

// Helper: call your own backend channel-id resolver
async function getChannelIdFromUrl(url) {
  try {
    const result = await axios.get(`https://yt-meta-backend.onrender.com/api/channel-id?url=${encodeURIComponent(url)}`);
    return result.data.channelId;
  } catch (err) {
    console.error("Failed to extract channel ID:", err.message);
    return null;
  }
}

module.exports = router;
