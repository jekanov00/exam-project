const { Model } = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  class Message extends Model {
    static associate({ Conversation, User }) {
      Message.belongsTo(Conversation, {
        foreignKey: 'conversation',
      });
      Message.belongsTo(User, {
        foreignKey: 'sender',
      });
    }
  }

  Message.init(
    {
      sender: {
        allowNull: false,
        type: dataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      body: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      conversation: {
        allowNull: false,
        type: dataTypes.INTEGER,
        references: {
          model: 'Conversation',
          key: 'id',
        },
      },
    },
    { sequelize, modelName: 'Message' },
  );
  return Message;
};
