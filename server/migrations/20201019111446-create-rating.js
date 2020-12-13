'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      offerId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Offers',
        },
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
        },
        type: Sequelize.INTEGER,
      },
      mark: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
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
    await queryInterface.dropTable('Ratings');
  },
};
