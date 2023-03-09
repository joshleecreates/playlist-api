import mongoose from '../db.js';
const { Schema } = mongoose;

const songSchema = new Schema({
  title:  String,
  description:  String,
  rating: { type: Number, default: 0, integer: true },
  date: { type: Date, default: Date.now },
});
const Song = mongoose.model('Song', songSchema);
export default Song;