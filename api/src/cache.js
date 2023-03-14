'use strict';

import logger from './logger.js';

const mongooseCache = function(mongoose, client) {
  const exec = mongoose.Query.prototype.exec;
  client.on("connect", () => {
    logger.info(`[LOG] Redis connected`);
    mongoose.Query.prototype._cache = true;
  });
  client.on("reconnecting", () => {
    logger.error(`[LOG] Redis disconnected`);
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
      return exec.apply(this, arguments);
    }
    const key = JSON.stringify(Object.assign({}, this.getQuery()));
    let cacheValue = null;
    try {
      cacheValue = await client.get(key);
    } catch (e) {
      logger.warn(e);
    }
    logger.info('made it');
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