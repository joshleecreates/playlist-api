'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/playlists', (req, res) => {
  res.json({
    playlists: [
      {playlist_id: '010dsz0'},
      {playlist_id: '010dsz1'},
      {playlist_id: '010dsz2'},
    ]
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});