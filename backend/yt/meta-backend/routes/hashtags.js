const express = require('express');
const router = express.Router();

const stopwords = [
  "the", "is", "at", "which", "on", "and", "a", "an", "of", "in", "to", "for", "with", "that", "this", "by", "from"
];

// Hardcoded fallback tags for common keywords (replace with DB/AI later)
const keywordSuggestions = {
  lofi: [
    "lofi", "lofibeats", "lofihiphop", "lofivibes", "studybeats", "chillhop", "relaxingmusic", "chillmusic", "vibes", "beats"
  ],
  gaming: [
    "gaming", "gamers", "gameplay", "livestream", "pcgaming", "xbox", "playstation", "gamingsetup", "esports", "gamerlife"
  ],
  vlog: [
    "vlog", "dailyvlog", "travelvlog", "vloggerlife", "vloglife", "indianvlogger", "vlogging", "videoblog", "youtubevlog", "travel"
  ],
  motivation: [
    "motivation", "inspiration", "success", "nevergiveup", "mindset", "goalsetting", "motivationalvideo", "positivity", "selfimprovement"
  ]
};

function extractVideoId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

router.get('/hashtags', async (req, res) => {
  const { url = "", text = "" } = req.query;

  let base = text.toLowerCase().trim();
  let hashtags = [];

  // If video URL exists, extract video ID (optional future use)
  const videoId = extractVideoId(url);

  // If a known keyword exists
  const mainKey = Object.keys(keywordSuggestions).find(k => base.includes(k));
  if (mainKey) {
    hashtags = keywordSuggestions[mainKey].map(tag => `#${tag}`);
  } else {
    // Basic fallback if unknown keyword
    const words = base.split(/\s+/).filter(w => !stopwords.includes(w.toLowerCase()) && w.length > 2);
    const extraSuggestions = [
      ...words,
      ...words.map(w => w + "vibes"),
      ...words.map(w => w + "shorts"),
      ...words.map(w => "best" + w),
    ];
    const unique = [...new Set(extraSuggestions.map(w => `#${w.toLowerCase()}`))];
    hashtags = unique;
  }

  res.json({ hashtags });
});

module.exports = router;
