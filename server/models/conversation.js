const { Model } = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  class Conversation extends Model {
    static associate({ Message }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
      });
    }
  }

  Conversation.init(
    {
      participants: {
        allowNull: false,
        type: dataTypes.ARRAY(dataTypes.INTEGER),
      },
      blackList: {
        allowNull: false,
        type: dataTypes.ARRAY(dataTypes.BOOLEAN),
      },
      favoriteList: {
        allowNull: false,
        type: dataTypes.ARRAY(dataTypes.BOOLEAN),
      },
    },
    { sequelize, modelName: 'Conversation' },
  );
  return Conversation;
};
