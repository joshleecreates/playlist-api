import mongoose from '../db.js';
const { Schema } = mongoose;

const playlistSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
  slug: String,
  date: { type: Date, default: Date.now },
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;