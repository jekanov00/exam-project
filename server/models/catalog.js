const { Model } = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  class Catalog extends Model {
    static associate({ User }) {
      Catalog.belongsTo(User, {
        foreignKey: 'userId',
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
    { sequelize, modelName: 'Catalog', timestamps: false },
  );
  return Catalog;
};
