import mongoose from 'mongoose';
import redis from "redis";
import mongooseCache from './cache.js';
import logger from './logger.js';

const connectionString = process.env.MONGO_URL || "";
mongoose.connect(connectionString);

if(process.env.ENABLE_CACHE) {
  logger.info('Redis Cache Enabled');
  const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6317"
  const client = redis.createClient({url: redisUrl});
  client.connect();
  client.on("error", function(error) {
    logger.error(`❗️ Redis Error: ${error}`)
  });
  mongooseCache(mongoose, client);
}

export default mongoose;