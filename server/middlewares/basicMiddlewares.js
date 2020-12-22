/* eslint-disable consistent-return */
const db = require('../models/index');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const { decodeToken } = require('../services/tokenService');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i + 1) {
    if (req.body.contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  const tokenData = decodeToken(req);
  try {
    if (tokenData.userRole === CONSTANTS.CUSTOMER) {
      result = await db.Contest.findOne({
        where: { id: req.headers.contestid, userId: tokenData.userId },
      });
    } else if (tokenData.userRole === CONSTANTS.CREATOR) {
      result = await db.Contest.findOne({
        where: {
          id: req.headers.contestid,
          status: {
            [db.Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  const tokenData = decodeToken(req);
  if (tokenData.userRole === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  const tokenData = decodeToken(req);
  if (tokenData.userRole === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  }
  return next();
};

module.exports.canSendOffer = async (req, res, next) => {
  const tokenData = decodeToken(req);
  if (tokenData.userRole === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await db.Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    const result = await db.Contest.findOne({
      where: {
        userId: tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    const result = db.Contest.findOne({
      where: {
        userId: tokenData.userId,
        id: req.body.contestId,
        status: { [db.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
