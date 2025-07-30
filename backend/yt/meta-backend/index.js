const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://toolswagon.site']
}));
app.use(express.json()); // required for JSON parsing

// Import Routes
const metaRoute = require('./routes/meta');
const channelIdRoute = require('./routes/channelId');
const earningsRoute = require('./routes/earnings'); // ✅ NEW
const monetizationChecker = require('./routes/monetization');
const hashtagRoute = require('./routes/hashtags');
const tagsRoute = require('./routes/tags');

// Routes
app.get('/', (req, res) => {
  res.send('YouTube Tools API is running ✅');
});

app.use('/api', metaRoute);          // /api/meta
app.use('/api', channelIdRoute);     // /api/channel-id
app.use('/api', earningsRoute);      // ✅ /api/earnings
app.use('/api', monetizationChecker);
app.use('/api', hashtagRoute);
app.use('/api', tagsRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
