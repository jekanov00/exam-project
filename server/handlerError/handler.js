/* eslint-disable no-unused-vars */
const { ValidationError } = require('yup');
const { Sequelize: { BaseError, UniqueConstraintError } } = require('../models');

const errorMapper = (err) => ({ title: err.message ?? 'Bad request' });

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
      errors: errors.map(errorMapper),
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
