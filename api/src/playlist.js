import mongoose from 'mongoose';
const { Schema } = mongoose;

const playlistSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  songs: [{ body: String, date: Date, title: String }],
  date: { type: Date, default: Date.now },
});