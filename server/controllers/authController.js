const createHttpError = require('http-errors');
const { User, RefreshToken } = require('../models');
const AuthService = require('../services/authService');

exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const userInstance = await User.findOne({
      where: { email },
    });

    if (userInstance && (await userInstance.comparePassword(password))) {
      const data = await AuthService.createSession(userInstance);
      return res.status(201).send({
        data,
      });
    }
    return next(createHttpError(403, 'Incorrect password or email'));
  } catch (err) {
    return next(err);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      return res.status(201).send({
        data,
      });
    }
    return next(createHttpError(401));
  } catch (err) {
    return next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (refreshTokenInstance && refreshTokenInstance.isUnexpired()) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      return res.send({
        data,
      });
    }
    return next(createHttpError(401));
  } catch (err) {
    return next(err);
  }
};
