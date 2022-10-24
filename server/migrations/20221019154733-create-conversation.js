'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      participants: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      blackList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
      },
      favoriteList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
  },
};
