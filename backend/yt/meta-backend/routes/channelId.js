const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/channel-id', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  const usernameMatch = url.match(/youtube\.com\/@([\w\d-_]+)/i);
  const channelIdMatch = url.match(/youtube\.com\/channel\/([\w-]+)/i);

  try {
    let channelId = "";

    if (channelIdMatch) {
      channelId = channelIdMatch[1];
    } else if (usernameMatch) {
      const username = usernameMatch[1];

      // ✅ Search for channel by handle (not using deprecated forUsername)
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${username}&key=${process.env.YOUTUBE_API_KEY}`
      );

      if (!data.items || !data.items.length)
        return res.status(404).json({ error: 'Channel not found' });

      channelId = data.items[0].snippet.channelId;
    } else {
      return res.status(400).json({ error: 'Invalid YouTube channel URL format' });
    }

    const { data: detailData } = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!detailData.items || !detailData.items.length)
      return res.status(404).json({ error: 'Details not found' });

    const info = detailData.items[0].snippet;

    res.json({
      channelId,
      channelName: info.title,
      channelAvatar: info.thumbnails.default.url
    });

  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
});

module.exports = router;
