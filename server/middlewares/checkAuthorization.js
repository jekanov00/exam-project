const createHttpError = require('http-errors');
const JwtService = require('../services/jwtService');
const config = require('../configs/config');

const {
  jwt: { tokenSecret },
} = config;

module.exports = async (req, res, next) => {
  try {
    const authorizationHeaderValue = req.get('Authorization');
    if (authorizationHeaderValue) {
      const [type, credentials] = authorizationHeaderValue.split(' ');
      if (type === 'Bearer') {
        const tokenPayload = await JwtService.verify(credentials, tokenSecret);
        req.tokenPayload = tokenPayload;
        return next();
      }
    }
    return next(createHttpError(401));
  } catch (err) {
    return next(createHttpError(401));
  }
};
