'use strict';

// import { songsCollection, playlistsCollection } from './db.js';

export async function getPlaylist(playlistID) {
  // const playlist = await playlistsCollection.findOne({ id: playlistID });
  // const songs = await songsCollection.find({ id : { $in : playlist.songs } }).toArray();

  return {
    playlist_id: playlistID,
    // songs: songs,
  }
}