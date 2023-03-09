import mongoose from 'mongoose';
import mongooseCache from './cache.js';
import redis from "redis";

const connectionString = process.env.MONGO_URL || "";
mongoose.connect(connectionString);

if(process.env.ENABLE_CACHE) {
  const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6317"
  const client = redis.createClient(redisUrl);
  client.on("error", function(error) {
    console.error(`❗️ Redis Error: ${error}`)
  });
  client.connect();
  mongooseCache(mongoose, client);
}

export default mongoose;