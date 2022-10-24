const { Model } = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation }) {
      Catalog.belongsTo(User, {
        foreignKey: 'userId',
      });
      Catalog.hasMany(Conversation, {
        foreignKey: 'conversationId',
      });
    }
  }

  Catalog.init(
    {
      userId: {
        allowNull: false,
        type: dataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      catalogName: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      chats: {
        allowNull: false,
        type: dataTypes.ARRAY(dataTypes.INTEGER),
      },
    },
    { sequelize, modelName: 'Catalog' },
  );
  return Catalog;
};
