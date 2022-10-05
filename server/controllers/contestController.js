const _ = require('lodash');
const { sequelize, Sequelize, User, Offer, Select, Rating, Contest } = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { decodeToken } = require('../services/tokenService');
const { transporter } = require('../transporter');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const whereOption = {
      type: {
        [Sequelize.Op.or]: _.compact([
          req.body.characteristic1,
          req.body.characteristic2,
          'industry',
        ]),
      },
    };
    const characteristics = await Select.findAll({
      where: whereOption,
    });
    if (!characteristics) {
      next(new ServerError());
      return;
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    let contestInfo = await Contest.findOne({
      where: { id: req.headers.contestid },
      order:
        tokenData.userRole === CONSTANTS.MODERATOR
          ? [
              [Offer, 'status', 'desc'],
              [Offer, 'id', 'asc'],
            ]
          : [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where: tokenData.userRole === CONSTANTS.CREATOR ? { userId: tokenData.userId } : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const { contestId } = req.body;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const tokenData = decodeToken(req);
  const userInstance = await User.findOne({
    where: {
      id: tokenData.userId,
    },
  });
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(req.body.customerId);
    const user = { ...userInstance.dataValues, id: tokenData.userId };
    delete user.password;
    return res.send({ ...result, User: user });
  } catch (e) {
    return next(new ServerError(e));
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Some of yours offers was rejected', contestId);
  return rejectedOffer;
};

const resolveOffer = async (contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: sequelize.literal(` CASE 
                                    WHEN "id"=${contestId} AND "orderId"='${orderId}' 
                                    THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}' 
                                    WHEN "orderId"='${orderId}' AND "priority"=${priority + 1} 
                                    THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}' 
                                    ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}' 
                                  END`),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: sequelize.literal(`balance + ${finishedContest.prize}`) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: sequelize.literal(` CASE 
                                    WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}' 
                                    ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}' 
                                  END`),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !== offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(arrayRoomsId, 'Some of yours offers was rejected', contestId);
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Some of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId, req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  const tokenData = decodeToken(req);
  Contest.findAll({
    where: { status: req.headers.status, userId: tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach((contest) => {
        contest.dataValues.count = contest.dataValues.Offers.length;
      });
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      return res.send({ contests, haveMore });
    })
    .catch((err) => next(new ServerError(err)));
};

module.exports.getModeratorContests = (req, res, next) => {
  Contest.findAll({
    where: { status: req.headers.status },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach((contest) => {
        contest.dataValues.count = contest.dataValues.Offers.length;
      });
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      return res.send({ contests, haveMore });
    })
    .catch((err) => next(new ServerError(err)));
};

module.exports.activateContest = async (req, res, next) => {
  try {
    const pendingContest = await contestQueries.updateContest(
      { status: 'active' },
      { id: req.body.id },
    );
    res.status(200).send({ ...req.body, ...pendingContest });
  } catch (e) {
    next(e);
  }
};

module.exports.getContests = (req, res, next) => {
  const tokenData = decodeToken(req);

  const predicates = UtilFunctions.createWhereForAllContests(
    req.body.typeIndex,
    req.body.contestId,
    req.body.industry,
    req.body.awardSort,
  );
  Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: Offer,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach((contest) => {
        contest.dataValues.count = contest.dataValues.Offers.length;
      });
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch((err) => {
      next(new ServerError(err));
    });
};

module.exports.activateOffer = async (req, res, next) => {
  try {
    await Offer.update({ status: 'active' }, { where: { id: req.body.id } });
    const {
      dataValues: { contestId },
    } = await Offer.findOne({
      where: { id: req.body.id },
      attributes: ['contestId'],
    });
    const offers = await Offer.findAll({
      where: { contestId },
      attributes: { exclude: ['userId', 'contestId'] },
      include: {
        model: User,
        attributes: { exclude: ['password'] },
      },
    });

    const contest = await Contest.findOne({
      where: { id: contestId },
      include: {
        model: User,
        attributes: ['id', 'email'],
      },
    });

    const {
      dataValues: {
        User: { email: offerCreatorEmail },
      },
    } = await Offer.findOne({
      where: { id: req.body.id },
      include: {
        model: User,
        attributes: ['id', 'email'],
      },
    });

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: contest.dataValues.User.email,
      subject: 'New offer',
      html: `<p>You have new offer on your contest.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: offerCreatorEmail,
      subject: 'Offer approved',
      html: `<p>One of your offers has been approved by moderator.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    res.status(200).send(offers);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOffer = async (req, res, next) => {
  try {
    const {
      dataValues: { contestId },
    } = await Offer.findOne({
      where: { id: req.body.id },
      attributes: ['contestId'],
    });

    const {
      dataValues: {
        User: { email: offerCreatorEmail },
      },
    } = await Offer.findOne({
      where: { id: req.body.id },
      include: {
        model: User,
        attributes: ['id', 'email'],
      },
    });

    await Offer.destroy({ where: { id: req.body.id } });
    const offers = await Offer.findAll({
      where: { contestId },
      attributes: { exclude: ['userId', 'contestId'] },
      include: {
        model: User,
        attributes: { exclude: ['password'] },
      },
    });

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: offerCreatorEmail,
      subject: 'Offer deleted',
      html: `<p>One of your offers has been deleted by moderator.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    res.status(200).send(offers);
  } catch (err) {
    next(err);
  }
};

module.exports.getModeratorOffers = async (req, res, next) => {
  try {
    if (req.body.user.role !== CONSTANTS.MODERATOR) {
      next('Not enough rights!');
    }

    const offers = await Offer.findAll({
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      order: [
        ['status', 'DESC'],
        ['contestId', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    const compareFunc = (a, b) => {
      const {
        dataValues: { status: status1 },
      } = a;
      const {
        dataValues: { status: status2 },
      } = b;
      if (
        status1 !== status2 &&
        (status1 === 'pending' || (status1 === 'active' && status2 !== 'pending'))
      ) {
        return -1;
      }
      if (
        status1 !== status2 &&
        (status2 === 'pending' || (status2 === 'active' && status1 !== 'pending'))
      ) {
        return 1;
      }
      return 0;
    };

    offers.sort(compareFunc);

    let { page } = req.body;
    const overallCount = offers.length;

    if (page < 1) {
      page = 1;
      next('Wrong page!');
    }

    if (page * 10 - 10 >= offers.length) {
      page = Math.ceil(offers.length / 10);
      next('Wrong page!');
    }

    let pageEnd = page * 10 - 1;
    const pageStart = page * 10 - 10;

    if (page * 10 > offers.length) {
      pageEnd = offers.length - 1;
    }

    const offersPaged = offers.slice(pageStart, pageEnd + 1);

    res.status(200).send({ offers: offersPaged, page, pageStart, pageEnd, overallCount });
  } catch (err) {
    next(err);
  }
};

module.exports.activateOfferBundle = async (req, res, next) => {
  try {
    await Offer.update({ status: 'active' }, { where: { id: req.body.id } });
    const offers = await Offer.findAll({
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      order: [
        ['status', 'DESC'],
        ['contestId', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    const compareFunc = (a, b) => {
      const {
        dataValues: { status: status1 },
      } = a;
      const {
        dataValues: { status: status2 },
      } = b;
      if (
        status1 !== status2 &&
        (status1 === 'pending' || (status1 === 'active' && status2 !== 'pending'))
      ) {
        return -1;
      }
      if (
        status1 !== status2 &&
        (status2 === 'pending' || (status2 === 'active' && status1 !== 'pending'))
      ) {
        return 1;
      }
      return 0;
    };

    offers.sort(compareFunc);

    const { contestId } = req.body;

    const contest = await Contest.findOne({
      where: { id: contestId },
      include: {
        model: User,
        attributes: ['id', 'email'],
      },
    });

    const offerCreatorEmail = req.body.User.email;

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: contest.dataValues.User.email,
      subject: 'New offer',
      html: `<p>You have new offer on your contest.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: offerCreatorEmail,
      subject: 'Offer approved',
      html: `<p>One of your offers has been approved by moderator.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    res.status(200).send(offers);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOfferBundle = async (req, res, next) => {
  try {
    await Offer.destroy({ where: { id: req.body.id } });
    const offers = await Offer.findAll({
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      order: [
        ['status', 'DESC'],
        ['contestId', 'ASC'],
        ['id', 'ASC'],
      ],
    });

    const compareFunc = (a, b) => {
      const {
        dataValues: { status: status1 },
      } = a;
      const {
        dataValues: { status: status2 },
      } = b;
      if (
        status1 !== status2 &&
        (status1 === 'pending' || (status1 === 'active' && status2 !== 'pending'))
      ) {
        return -1;
      }
      if (
        status1 !== status2 &&
        (status2 === 'pending' || (status2 === 'active' && status1 !== 'pending'))
      ) {
        return 1;
      }
      return 0;
    };

    offers.sort(compareFunc);

    const { contestId } = req.body;

    const offerCreatorEmail = req.body.User.email;

    await transporter.sendMail({
      from: '"Squadhelp" <noreply@squadhelp.com>',
      to: offerCreatorEmail,
      subject: 'Offer deleted',
      html: `<p>One of your offers has been deleted by moderator.</p><p>You can check it by the following link:</p><p><a href="http://localhost:3000/contest/${contestId}">http://localhost:3000/contest/${contestId}</a></p><p>This is an automatic generated email, please don't reply to it.</p><br /><p>Best wishes,<br />Squadhelp!</p>`,
    });

    res.status(200).send(offers);
  } catch (err) {
    next(err);
  }
};
