'use strict';

import db from './db.js';

export async function getPlaylist(playlistID) {
  const playlistsCollection = db.collection('playlists');
  const playlist = await playlistsCollection.findOne({ id: playlistID });
  const songs = await getSongs(playlist.songs);

  return {
    playlist_id: playlistID,
    songs: songs,
  }
}

export async function getSongs(ids) {
  const songsCollection = db.collection('songs');
  const songs = await songsCollection.find({ id : { $in : ids } }).toArray();
  return songs;
}