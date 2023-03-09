import mongoose from '../db.js';
const { Schema } = mongoose;

const songSchema = new Schema({
  title:  String,
  description:  String,
  rating: { type: Number, default: 0, integer: true },
  date: { type: Date, default: Date.now },
});
songSchema.pre('find', async function() {
  //wait for 2 seconds
  const maxDelay = process.env.MAX_DELAY || 0;
  const delay = Math.floor(Math.random() * maxDelay);
  await new Promise(resolve => setTimeout(resolve, delay));
});
const Song = mongoose.model('Song', songSchema);
export default Song;