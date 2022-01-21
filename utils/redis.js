const redis = require('redis');
const util = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.asyncGet = util.promisify(this.client.get).bind(this.client);
    this.asyncSet = util.promisify(this.client.set).bind(this.client);
    this.connected = false;
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
    });
    this.connected = true;
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const value = await this.asyncGet(key);
    return value;
  }

  async set(key, value) {
    await this.asyncSet(key, value);
  }

  del(key) {
    this.client.del(key);
    return true;
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
