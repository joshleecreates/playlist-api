'use strict';

const mongooseCache = function(mongoose, client) {
  const exec = mongoose.Query.prototype.exec;
  client.on("connect", () => {
    console.log(`[LOG] Redis connected`);
    mongoose.Query.prototype._cache = true;
  });
  client.on("reconnecting", () => {
    console.log(`[LOG] Redis disconnected`);
    mongoose.Query.prototype._cache = false;
  });

  mongoose.Query.prototype.cache = function(time) {
    this._cache = false;
    if (time) {
      this._expire = time;
    }
    return this;
  };

  mongoose.Query.prototype.exec = async function() {
    if (!this._cache) {
      const maxDelay = process.env.MAX_DELAY || 0;
      const delay = Math.floor(Math.random() * maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));    
      return exec.apply(this, arguments);
    }
    console.log(`[LOG] Serving from cache`);

    const key = JSON.stringify(Object.assign({}, this.getQuery()));
    const cacheValue = await client.get(key);
    if (cacheValue !== null) {
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result), "EX", this._expire ? this._expire : 60);
    return result;
  };
};

export default mongooseCache;