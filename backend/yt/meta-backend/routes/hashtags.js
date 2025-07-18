const express = require('express');
const router = express.Router();

// Basic stopwords for filtering non-informative words
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "of", "for", "with", "to", "is", "are", "was", "were", "at",
  "by", "it", "from", "this", "that", "be", "as", "you", "your", "i", "me", "my", "we", "our", "us",
  "they", "them", "their", "has", "have", "had", "not", "but", "can", "will", "just"
]);

// Function to extract video ID from different YouTube URL formats
function extractVideoId(url) {
  const regex = /(?:v=|\/(?:embed|shorts|v)\/|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Fallback dummy function to simulate getting title/description from a video ID
async function getVideoInfo(videoId) {
  // You can connect your actual YouTube Data API here if needed
  return {
    title: "Sample Video Title about Lofi Chill Beats Study Music",
    description: "Relaxing lofi hip hop chill study beats to relax and focus. Perfect music for studying or sleeping."
  };
}

// Function to extract hashtags from a string
function generateHashtagsFromText(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));

  const unique = Array.from(new Set(words));
  return unique.map(word => `#${word}`);
}

router.get('/hashtags', async (req, res) => {
  const { url, text } = req.query;

  try {
    let rawText = text;

    // If the input is a YouTube URL, extract video ID and fetch its metadata
    if (url && url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = extractVideoId(url);
      if (!videoId) return res.status(400).json({ error: 'Invalid YouTube video URL.' });

      const info = await getVideoInfo(videoId);
      rawText = `${info.title} ${info.description}`;
    }

    if (!rawText || rawText.trim().length < 3) {
      return res.status(400).json({ error: 'No valid keyword or video content to process.' });
    }

    let hashtags = generateHashtagsFromText(rawText);

    // Format hashtags within 500 character limit
    const finalTags = [];
    let totalLen = 0;

    for (const tag of hashtags) {
      const withComma = tag + ', ';
      if ((totalLen + withComma.length) <= 500) {
        finalTags.push(tag);
        totalLen += withComma.length;
      } else {
        break;
      }
    }

    res.json({ hashtags: finalTags });

  } catch (err) {
    console.error("Hashtag Generator Error:", err.message);
    res.status(500).json({ error: 'Something went wrong while generating hashtags.' });
  }
});

module.exports = router;
