'use strict';

import Playlist from './models/playlist.js';
import Song from './models/song.js';

export async function getPlaylist(slug) {
  const playlist = await Playlist.findOne({ slug: slug }).cache(60);
  const songs = await Song.find({ _id: { $in: playlist.songs } }).where({ $where: "sleep(400) || true" }).cache(60);
  return {
    data: {
      playlist: playlist,
      songs: songs,
    }
  };
}