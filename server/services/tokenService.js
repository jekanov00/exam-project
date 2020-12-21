const jwt = require('jsonwebtoken');
const {
  jwt: { tokenSecret },
} = require('../configs/config');

exports.decodeToken = (req) => {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    return jwt.verify(token, tokenSecret);
  } catch (e) {
    throw new Error(e);
  }
};
