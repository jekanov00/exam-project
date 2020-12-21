const { Model } = require('sequelize');
const isAfter = require('date-fns/isAfter');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    isUnexpired() {
      return isAfter(new Date(this.get('expiredIn')), new Date());
    }

    static associate({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  RefreshToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
        },
      },
      token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      expiredIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userAgent: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    },
  );

  return RefreshToken;
};
