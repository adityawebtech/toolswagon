const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ✅ 1. Import cors
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 2. Use cors middleware
app.use(cors({
  origin: ['https://toolswagon.site']
}));

// Import Routes
const metaRoute = require('./routes/meta');
const channelIdRoute = require('./routes/channelId');

// Routes
app.get('/', (req, res) => {
  res.send('YouTube Tools API is running ✅');
});

app.use('/api', metaRoute);         // /api/meta
app.use('/api', channelIdRoute);    // /api/channel-id

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
