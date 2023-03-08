'use strict';

import db from './db.js';

export function getPlaylists() {
  return {
    playlists: [
      {playlist_id: '010dsz0'},
      {playlist_id: '010dsz1'},
      {playlist_id: '010dsz2'},
    ]
  }
}

export async function getPlaylist(playlistID) {
  const songsCollection = db.collection('songs')
  const songs = await songsCollection.find().toArray();
  return {
    playlist_id: "010dsz0",
    songs: songs,
  }
}