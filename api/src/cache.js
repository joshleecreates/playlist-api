import redis from "redis";
import util from "util";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
var client = redis.createClient(redisUrl);

client.on("error", function(err) {
  console.error("Error connecting to redis", err);
});

client.get = util.promisify(client.get);

client.connect(); 

const mongooseCache = function(mongoose) {
  const exec = mongoose.Query.prototype.exec;

  mongoose.Query.prototype.cache = function(time) {
    this._cache = true;

    if (time) {
      this._expire = time;
    }
    return this;
  };

  mongoose.Query.prototype.exec = async function() {
    if (!this._cache) {
      return exec.apply(this, arguments);
    }
    console.log(`[LOG] Serving from cache`);

    const key = JSON.stringify(Object.assign({}, this.getQuery()));
    const cacheValue = await client.get(key);

    if (cacheValue) {
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result), "EX", this._expire ? this._expire : 60);
    return result;
  };
};

export default mongooseCache;