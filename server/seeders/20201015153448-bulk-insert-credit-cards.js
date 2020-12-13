'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'CreditCards',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/20',
          cvc: '453',
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cardNumber: '4111111111111111',
          name: 'buyer',
          expiry: '12/22',
          cvc: '111',
          balance: 999999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cardNumber: '4000000000000000',
          name: 'creative',
          expiry: '12/22',
          cvc: '000',
          balance: 999999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CreditCards', null, {});
  },
};
