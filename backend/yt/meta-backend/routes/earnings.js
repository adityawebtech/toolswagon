const express = require('express');
const axios = require('axios');
const router = express.Router();

// Utility to extract video ID
const extractVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

router.get('/earnings', async (req, res) => {
  const { channelId, videoId } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    if (channelId) {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
        params: {
          part: 'statistics,snippet',
          id: channelId,
          key: apiKey
        }
      });

      const channel = response.data.items[0];
      if (!channel) return res.status(404).json({ error: 'Channel not found' });

      const stats = channel.statistics;
      const snippet = channel.snippet;
      const totalViews = parseInt(stats.viewCount);
      const RPM_LOW = 0.5, RPM_HIGH = 2.5;
      const estimatedEarningsLow = ((totalViews / 1000) * RPM_LOW).toFixed(2);
      const estimatedEarningsHigh = ((totalViews / 1000) * RPM_HIGH).toFixed(2);
      const avgEarning = ((parseFloat(estimatedEarningsLow) + parseFloat(estimatedEarningsHigh)) / 2).toFixed(2);

      return res.json({
        type: "channel",
        channelId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        subscriberCount: stats.subscriberCount || '0',
        videoCount: stats.videoCount || '0',
        totalViews,
        estimatedEarningsLow,
        estimatedEarningsHigh,
        avgEarning,
        country: snippet.country || 'N/A'
      });
    }

    if (videoId) {
      const videoRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'statistics,snippet',
          id: videoId,
          key: apiKey
        }
      });

      const video = videoRes.data.items[0];
      if (!video) return res.status(404).json({ error: 'Video not found' });

      const stats = video.statistics;
      const snippet = video.snippet;
      const viewCount = parseInt(stats.viewCount);
      const RPM_LOW = 0.7, RPM_HIGH = 3.0;
      const estimatedEarningsLow = ((viewCount / 1000) * RPM_LOW).toFixed(2);
      const estimatedEarningsHigh = ((viewCount / 1000) * RPM_HIGH).toFixed(2);
      const avgEarning = ((parseFloat(estimatedEarningsLow) + parseFloat(estimatedEarningsHigh)) / 2).toFixed(2);

      return res.json({
        type: "video",
        videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        viewCount,
        estimatedEarningsLow,
        estimatedEarningsHigh,
        avgEarning,
        publishedAt: snippet.publishedAt,
        categoryId: snippet.categoryId || 'Unknown'
      });
    }

    return res.status(400).json({ error: 'channelId or videoId is required' });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

module.exports = router;
