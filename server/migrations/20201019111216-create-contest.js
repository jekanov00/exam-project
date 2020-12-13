'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        allowNull: false,
        type: Sequelize.ENUM('name', 'tagline', 'logo'),
      },
      fileName: {
        type: Sequelize.STRING,
      },
      originalFileName: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      typeOfName: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      focusOfWork: {
        type: Sequelize.TEXT,
      },
      targetCustomer: {
        type: Sequelize.TEXT,
      },
      styleName: {
        type: Sequelize.STRING,
      },
      nameVenture: {
        type: Sequelize.STRING,
      },
      typeOfTagline: {
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brandStyle: {
        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Contests');
  },
};
