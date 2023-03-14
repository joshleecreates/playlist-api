'use strict';

//Import express
import instana from '@instana/collector';
import express from 'express';
import { getPlaylist } from './src/playlists.js';
import logger from './src/logger.js';
import './src/db.js';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


const app = express();
app.use((req, res, next) => {
  req.logger = logger;
  next();
});
app.get('/health', (req, res) => {
  var stat = {
      app: 'OK',
  };
  res.json(stat);
});

app.get('/playlist/:id', async (req, res) => {
  req.logger.info('getting playlist');
  const data = await getPlaylist(req.params.id);
  res.json(data);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
