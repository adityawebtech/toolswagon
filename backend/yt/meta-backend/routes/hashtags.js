const express = require('express');
const router = express.Router();

const stopwords = [
  "the", "is", "at", "which", "on", "and", "a", "an", "of", "in", "to", "for", "with", "that", "this", "by", "from"
];

const keywordSuggestions = {
  lofi: [
    "lofi", "lofibeats", "lofihiphop", "lofivibes", "studybeats", "chillhop", "relaxingmusic", "chillmusic", "vibes", "beats",
    "music", "study", "relax", "lofimusic", "calm", "focus", "backgroundmusic", "lofiart", "latevibes", "aesthetic",
    "nightvibes", "instrumental", "sleeptunes", "chillvibes", "nostalgia"
  ],
  vlog: [
    "vlog", "dailyvlog", "travelvlog", "vloggerlife", "vloglife", "indianvlogger", "vlogging", "videoblog", "youtubevlog", "travel",
    "lifestylevlog", "newvlog", "vlogday", "vlogtrip", "journey", "myvlog", "exploring", "indiavlog", "vloggers", "adventure",
    "vlogcontent", "personalvlog", "mobilevlog", "reallife", "vloggerslife"
  ],
  motivation: [
    "motivation", "inspiration", "success", "nevergiveup", "mindset", "goalsetting", "motivationalvideo", "positivity", "selfimprovement",
    "growth", "hustle", "focus", "dailygrind", "winner", "ambition", "workhard", "dreambig", "dedication", "motivated",
    "mindpower", "selfgrowth", "grindmode", "resilience", "motivationdaily", "lifecoach"
  ]
};

function extractVideoId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

router.get('/hashtags', async (req, res) => {
  const { url = "", text = "" } = req.query;

  const input = text.toLowerCase().trim();
  let tags = [];

  const keyword = Object.keys(keywordSuggestions).find(k => input.includes(k));

  if (keyword) {
    tags = keywordSuggestions[keyword];
  } else {
    const words = input.split(/\s+/).filter(w => !stopwords.includes(w) && w.length > 2);
    const extras = [
      ...words,
      ...words.map(w => w + "vibes"),
      ...words.map(w => "best" + w)
    ];
    tags = [...new Set(extras)];
  }

  // Apply formatting, enforce 25 hashtags and 500-character limit
  let finalHashtags = [];
  let totalLength = 0;

  for (const tag of tags) {
    const formatted = `#${tag.toLowerCase()}`;
    const extra = formatted.length + (finalHashtags.length > 0 ? 2 : 0); // 2 = ", "

    if (
      finalHashtags.length < 25 &&
      totalLength + extra <= 500
    ) {
      finalHashtags.push(formatted);
      totalLength += extra;
    } else {
      break;
    }
  }

  res.json({ hashtags: finalHashtags });
});

module.exports = router;
