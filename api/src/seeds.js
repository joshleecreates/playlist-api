'use strict';

import mongoose from 'mongoose';
import Playlist from './models/playlist.js';
import Song from './models/song.js';

const connectionString = process.env.MONGO_URL || "";
mongoose.connect(connectionString);

const songs = [
  {
    title: 'Eye of the Tiger',
    description: 'Rock',
    rating: 5,
  },
  {
    title: 'We are the Champions',
    description: 'Rock',
    rating: 5,
  },
  {
    title: 'We Will Rock You',
    description: 'Rock',
    rating: 4,
  },
  {
    title: 'Roar',
    description: 'Pop',
    rating: 4,
  },
];

//insert songs into mongoose as new records
const songRecords = songs.map(song => new Song(song));
const songIds = songRecords.map(song => song._id);

//create a new playlist with the song ids
const playlist = new Playlist({
  title: "Josh's Morning Routine",
  songs: songIds,
  slug: '01',
});

await Song.deleteMany({});
await Playlist.deleteMany({});

//save songs and playlist
Promise.all(songRecords.map(song => song.save()))
  .then(() => playlist.save())
  .then(() => mongoose.connection.close())
  .then(() => console.log('done'));