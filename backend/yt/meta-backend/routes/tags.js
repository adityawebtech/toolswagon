const express = require("express");
const router = express.Router();

// Dummy tags generation based on keywords or URL
function extractTags(query) {
  const commonTags = ["youtube", "video", "viral", "trending", "shorts"];
  const keywordTags = query
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(word => word.length > 2);

  return Array.from(new Set([...commonTags, ...keywordTags]));
}

router.post("/extract-tags", async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query is required." });
  }

  const tags = extractTags(query);

  res.json({ tags });
});

module.exports = router;
