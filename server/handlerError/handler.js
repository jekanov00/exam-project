/* eslint-disable no-unused-vars */
const { ValidationError } = require('yup');
const fs = require('fs');
const {
  Sequelize: { BaseError, UniqueConstraintError },
} = require('../models');
const { LOG_FILE_PATH } = require('../constants');
const { logger } = require('../utils/logger');

const errorMapper = (err) => ({ title: err.message ?? 'Bad request' });

exports.errorLogger = (err, req, res, next) => {
  logger();
  fs.readFile(LOG_FILE_PATH, 'utf8', (readErr, data) => {
    if (readErr) {
      next(readErr);
    } else {
      const fileData = JSON.parse(data);
      fileData.push({
        message: err.message,
        time: Date.now(),
        code: err.code,
        stackTrace: err.stack,
      });

      fs.writeFile(LOG_FILE_PATH, JSON.stringify(fileData), 'utf8', (writeErr) => {
        if (writeErr) {
          next(writeErr);
        }
      });
    }
  });

  return next(err);
};

exports.yupErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errors: err?.errors?.map(errorMapper) ?? [{ title: 'validation error' }],
    });
  }
  return next(err);
};

exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    const { errors } = err;
    res.status(400);
    if (err instanceof UniqueConstraintError) {
      res.status(409);
    }
    return res.send({
      errors: errors?.map(errorMapper),
    });
  }
  return next(err);
};

exports.httpErrorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({
      errors: [err],
    });
  }
  return next(err);
};

exports.errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({
      errors: [err],
    });
  }
  return next(err);
};
