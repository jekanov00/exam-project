const { hashSync, compare } = require('bcrypt');
const { Model } = require('sequelize');
const {
  permissions: { roles },
} = require('../configs/config');
const { SALT_ROUNDS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    comparePassword(value) {
      return compare(value, this.getDataValue('password'));
    }

    static associate({
      Contest, Offer, Rating, RefreshToken,
    }) {
      // User*(role: customer) 1:n Contest
      User.hasMany(Contest, {
        foreignKey: 'userId',
      });
      // User*(role: creator) 1:n Offer
      User.hasMany(Offer, {
        foreignKey: 'userId',
      });
      // User*(role: customer) 1:n Rating
      User.hasMany(Rating, {
        foreignKey: 'userId',
      });

      User.hasMany(RefreshToken, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'passwordHash',
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          this.setDataValue('password', hashSync(value, SALT_ROUNDS));
        },
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkRoleValue(value) {
            if (roles.includes(value)) {
              return;
            }
            throw new Error(`Role "${value}" is not valid value!`);
          },
        },
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
