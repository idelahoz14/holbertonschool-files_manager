const redisClient = require('./redis');

module.exports = async (req, res, next) => {
  const token = req.header('X-Token');

  if (!token) {
    return res.status(401).send({ error: 'Token is mandatory' });
  }
  const id = await redisClient.get(`auth_${token}`);

  if (!id) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  req.userId = id;
  req.token = token;
  next();
  return true;
};
