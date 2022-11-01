const { Op } = require('sequelize');
const { User, Conversation, Message, Catalog } = require('../models/index');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const { decodeToken } = require('../services/tokenService');

module.exports.addMessage = async (req, res, next) => {
  const tokenUserId = decodeToken(req).userId;
  const userInstance = await User.findOne({
    where: {
      id: tokenUserId,
    },
  });
  const participants = [userInstance.id, req.body.recipient];
  participants.sort((participant1, participant2) => participant1 - participant2);
  try {
    // const newConversation = await Conversation_mongo.findOneAndUpdate(
    //   {
    //     participants,
    //   },
    //   { participants, blackList: [false, false], favoriteList: [false, false] },
    //   {
    //     upsert: true,
    //     new: true,
    //     setDefaultsOnInsert: true,
    //     useFindAndModify: false,
    //   },
    // );

    const [newConversation, created] = await Conversation.findOrCreate({
      where: { participants },
      defaults: {
        blackList: [false, false],
        favoriteList: [false, false],
      },
    });

    const conversationId = newConversation.id;

    // const message = new Message_mongo({
    //   sender: userInstance.id,
    //   body: req.body.messageBody,
    //   conversation: conversationId,
    // });
    // await message.save();

    const message = await Message.create({
      sender: userInstance.id,
      body: req.body.messageBody,
      conversation: conversationId,
    });

    // message._doc.participants = participants;

    const interlocutorId = participants.filter((participant) => participant !== tokenUserId)[0];

    const preview = {
      id: conversationId,
      sender: userInstance.id,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: newConversation.id,
        sender: userInstance.id,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: userInstance.id,
          firstName: userInstance.firstName,
          lastName: userInstance.lastName,
          displayName: userInstance.displayName,
          avatar: userInstance.avatar,
          email: userInstance.email,
        },
      },
    });

    res.status(201).send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const tokenData = decodeToken(req);
  const participants = [tokenData.userId, req.body.interlocutorId];
  participants.sort((participant1, participant2) => participant1 - participant2);
  try {
    // const messages = await Message_mongo.aggregate([
    //   {
    //     $lookup: {
    //       from: 'conversations',
    //       localField: 'conversation',
    //       foreignField: '_id',
    //       as: 'conversationData',
    //     },
    //   },
    //   { $match: { 'conversationData.participants': participants } },
    //   { $sort: { createdAt: 1 } },
    //   {
    //     $project: {
    //       _id: 1,
    //       sender: 1,
    //       body: 1,
    //       conversation: 1,
    //       createdAt: 1,
    //       updatedAt: 1,
    //     },
    //   },
    // ]);

    const messages = await Message.findAll({
      include: {
        model: Conversation,
        required: true,
        where: {
          participants,
        },
      },
      order: [['createdAt', 'ASC']],
    });

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });
    res.status(200).send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // const conversations = await Message_mongo.aggregate([
    //   {
    //     $lookup: {
    //       from: 'conversations',
    //       localField: 'conversation',
    //       foreignField: '_id',
    //       as: 'conversationData',
    //     },
    //   },
    //   {
    //     $unwind: '$conversationData',
    //   },
    //   {
    //     $match: {
    //       'conversationData.participants': tokenData.userId,
    //     },
    //   },
    //   {
    //     $sort: {
    //       createdAt: -1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$conversationData._id',
    //       sender: { $first: '$sender' },
    //       text: { $first: '$body' },
    //       createAt: { $first: '$createdAt' },
    //       participants: { $first: '$conversationData.participants' },
    //       blackList: { $first: '$conversationData.blackList' },
    //       favoriteList: { $first: '$conversationData.favoriteList' },
    //     },
    //   },
    // ]);

    const conversations = await Conversation.findAll({
      where: {
        participants: { [Op.contains]: [tokenData.userId] },
      },
      include: {
        model: Message,
        required: true,
        attributes: ['id', 'sender', ['body', 'text'], ['createdAt', 'createAt']],
        order: [[Message, 'createdAt', 'DESC']],
      },
      group: ['Conversation.id', 'Messages.id'],
    });

    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(
        conversation.participants.find((participant) => participant !== tokenData.userId),
      );
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.dataValues.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
      const lastMessage = conversation.Messages.slice(-1)[0].dataValues;
      conversation.dataValues.text = lastMessage.text;
      conversation.dataValues.sender = lastMessage.sender;
      conversation.dataValues.createAt = lastMessage.createAt;
    });

    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const tokenData = decodeToken(req);
  const predicate = req.body.participants.indexOf(tokenData.userId);
  try {
    // const chat = await Conversation_mongo.findOneAndUpdate(
    //   { participants: req.body.participants },
    //   { $set: { [predicate]: req.body.blackListFlag } },
    //   { new: true },
    // );

    const chatToUpdate = await Conversation.findOne({
      where: {
        participants: req.body.participants,
      },
    });
    const newBlackList = chatToUpdate.dataValues.blackList;
    newBlackList[predicate] = req.body.blackListFlag;

    await Conversation.update(
      {
        blackList: newBlackList,
      },
      {
        where: {
          participants: req.body.participants,
        },
      },
    );

    res.send(chatToUpdate);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== tokenData.userId,
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chatToUpdate);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const tokenData = decodeToken(req);
  const predicate = req.body.participants.indexOf(tokenData.userId);
  try {
    // const chat = await Conversation_mongo.findOneAndUpdate(
    //   { participants: req.body.participants },
    //   { $set: { [predicate]: req.body.favoriteFlag } },
    //   { new: true },
    // );

    const chatToUpdate = await Conversation.findOne({
      where: {
        participants: req.body.participants,
      },
    });
    const newFavoriteList = chatToUpdate.dataValues.favoriteList;
    newFavoriteList[predicate] = req.body.favoriteFlag;
    await Conversation.update(
      {
        favoriteList: newFavoriteList,
      },
      {
        where: {
          participants: req.body.participants,
        },
      },
    );

    res.send(chatToUpdate);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const tokenData = decodeToken(req);
  // const catalog = new Catalog_mongo({
  //   userId: tokenData.userId,
  //   catalogName: req.body.catalogName,
  //   chats: [req.body.chatId],
  // });

  try {
    const catalog = await Catalog.create({
      userId: tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // const catalog = await Catalog_mongo.findOneAndUpdate(
    //   {
    //     _id: req.body.catalogId,
    //     userId: tokenData.userId,
    //   },
    //   { catalogName: req.body.catalogName },
    //   { new: true },
    // );

    const catalog = await Catalog.update(
      { catalogName: req.body.catalogName },
      {
        where: {
          id: req.body.catalogId,
          userId: tokenData.userId,
        },
      },
    );

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // const catalog = await Catalog_mongo.findOneAndUpdate(
    //   {
    //     _id: req.body.catalogId,
    //     userId: tokenData.userId,
    //   },
    //   { $addToSet: { chats: req.body.chatId } },
    //   { new: true },
    // );

    const catalog = await Catalog.findOne({
      where: {
        id: req.body.catalogId,
        userId: tokenData.userId,
      },
    });
    const { chats: chatIds } = catalog.dataValues;
    if (!chatIds.includes(req.body.chatId)) {
      chatIds.push(req.body.chatId);

      await Catalog.update(
        { chats: chatIds },
        {
          where: {
            id: req.body.catalogId,
            userId: tokenData.userId,
          },
        },
      );
    }
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // const catalog = await Catalog_mongo.findOneAndUpdate(
    //   {
    //     _id: req.body.catalogId,
    //     userId: tokenData.userId,
    //   },
    //   { $pull: { chats: req.body.chatId } },
    //   { new: true },
    // );
    const catalog = await Catalog.findOne({
      where: {
        id: req.body.catalogId,
        userId: tokenData.userId,
      },
    });
    const { chats: chatIds } = catalog.dataValues;
    const chatIdIndex = chatIds.indexOf(req.body.chatId);
    if (chatIdIndex === -1) {
      throw new Error('Wrong chat id!');
    }
    chatIds.splice(chatIdIndex, 1);

    await Catalog.update(
      { chats: chatIds },
      {
        where: {
          id: req.body.catalogId,
          userId: tokenData.userId,
        },
      },
    );
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // await Catalog_mongo.remove({
    //   _id: req.body.catalogId,
    //   userId: tokenData.userId,
    // });

    await Catalog.destroy({
      where: {
        id: req.body.catalogId,
        userId: tokenData.userId,
      },
    });

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const tokenData = decodeToken(req);
    // const catalogs = await Catalog_mongo.aggregate([
    //   { $match: { userId: tokenData.userId } },
    //   {
    //     $project: {
    //       _id: 1,
    //       catalogName: 1,
    //       chats: 1,
    //     },
    //   },
    // ]);

    const catalogs = await Catalog.findAll({
      where: {
        userId: tokenData.userId,
      },
      attributes: ['id', 'catalogName', 'chats'],
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
