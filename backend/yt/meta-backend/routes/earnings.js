const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/earnings', async (req, res) => {
  const { channelId } = req.query;
  if (!channelId) return res.status(400).json({ error: 'Missing channelId' });

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'statistics,snippet',
        id: channelId,
        key: apiKey
      }
    });

    const channel = response.data.items[0];
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const stats = channel.statistics;
    const snippet = channel.snippet;

    const totalViews = parseInt(stats.viewCount);
    const subscriberCount = parseInt(stats.subscriberCount || '0');
    const videoCount = parseInt(stats.videoCount || '0');

    // Earnings Estimation (RPM in USD)
    const RPM_LOW = 0.5;
    const RPM_HIGH = 2.5;

    const estimatedEarningsLow = ((totalViews / 1000) * RPM_LOW).toFixed(2);
    const estimatedEarningsHigh = ((totalViews / 1000) * RPM_HIGH).toFixed(2);
    const avgEarning = (((parseFloat(estimatedEarningsLow) + parseFloat(estimatedEarningsHigh)) / 2)).toFixed(2);

    res.json({
      channelId,
      channelTitle: snippet.title,
      thumbnail: snippet.thumbnails.default.url,
      subscriberCount,
      totalViews,
      videoCount,
      estimatedEarningsLow,
      estimatedEarningsHigh,
      avgEarning,
      country: snippet.country || 'N/A'
    });

  } catch (err) {
    console.error("Error fetching channel data:", err.message);
    res.status(500).json({
      error: 'Something went wrong',
      details: err.response?.data?.error?.message || err.message
    });
  }
});

module.exports = router;
