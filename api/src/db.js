import mongoose from 'mongoose';
import mongooseCache from './cache.js';

const connectionString = process.env.MONGO_URL || "";
mongoose.connect(connectionString);

// mongooseCache(mongoose);

export default mongoose;