import mongoose from 'mongoose';
import * as mongooseCache from 'mongodb-redis-cache';
import './playlist.js';

const connectionString = process.env.MONGO_URL || "";
mongoose.connect(connectionString);

const redisConnectionString = process.env.REDIS_HOST || "";
const cache = mongooseCache(mongoose, "redis://127.0.0.1:6379");

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("catalogue");

const playlistsCollection = db.collection('playlists');
const songsCollection = db.collection('songs');

export { playlistsCollection, songsCollection };