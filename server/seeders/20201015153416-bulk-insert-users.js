'use strict';

const bcrypt = require('bcrypt');
const CONSTANTS = require('./../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Buyer',
          lastName: 'Buyerovich',
          displayName: 'buyer',
          passwordHash: await bcrypt.hash('Test1234', CONSTANTS.SALT_ROUNDS),
          email: 'customer@gmail.com',
          role: 'customer',
          balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Creator',
          lastName: 'Creatvich',
          displayName: 'creator',
          passwordHash: await bcrypt.hash('Test1234', CONSTANTS.SALT_ROUNDS),
          email: 'creator@gmail.com',
          role: 'creator',
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Moderator',
          lastName: 'Moderatorovich',
          displayName: 'Moderator',
          paspasswordHash: await bcrypt.hash('Test1234', CONSTANTS.SALT_ROUNDS),
          email: 'moderator@gmail.com',
          role: 'moderator',
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
