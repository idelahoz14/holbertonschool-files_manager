const dbClient = require('../utils/db');

async function postNew(params) {
  const { email, password } = params;
  if (!email) {
    throw new Error('Missing email');
  }

  if (!password) {
    throw new Error('Missing password');
  }

  let user = await dbClient.findUserByEmail(email);
  if (user) {
    throw new Error('Already exist');
  }

  user = await dbClient.createUser(email, password);
  return user;
}

async function getMe(id) {
  const user = await dbClient.findUserById(id);
  if (!user) {
    throw new Error('user dont find');
  }
  return user;
}

module.exports = { postNew, getMe };
