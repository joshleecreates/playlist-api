'use strict';

//Import express
import express from 'express';
import { getPlaylist, getPlaylists } from './src/playlists.js';
import db from './src/db.js';


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/health', (req, res) => {
  var stat = {
      app: 'OK',
  };
  res.json(stat);
});

app.get('/playlists', (req, res) => {
  const playlists = getPlaylists();
  res.json(playlists);
});

app.get('/playlist/:id', async (req, res) => {
  const data = await getPlaylist(req.params.id);
  res.json(data);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
