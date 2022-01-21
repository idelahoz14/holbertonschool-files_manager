const sha1 = require('sha1');
const { v4: uuidv4 } = require('uuid');

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

async function getConnect(email, password) {
  try {
    const user = await dbClient.findUserByEmail(email);
    if (!user) {
      throw new Error('Unauthorized');
    }
    if (sha1(password) !== user.password) {
      throw new Error('Invalid credentials');
    }

    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, user._id.toString(), 86400);
    return { token };
  } catch (err) {
    console.log(err);
  }
  return null;
}

async function getDisconnect(token) {
  try {
    redisClient.del(`auth_${token}`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getConnect, getDisconnect };
