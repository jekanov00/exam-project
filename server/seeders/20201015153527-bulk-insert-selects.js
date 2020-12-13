'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      'Selects',
      [
        {
          type: 'typeOfName',
          describe: 'Company',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfName',
          describe: 'Product',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfName',
          describe: 'Project',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Classic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Fun',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Professional',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Descriptive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Youthful',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'nameStyle',
          describe: 'Any',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Classic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Fun',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Powerful',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Descriptive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Modern',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'typeOfTagline',
          describe: 'Any',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Techy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Fun',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Fancy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Minimal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Brick & Mortar',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'brandStyle',
          describe: 'Photo-based',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Creative Agency',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Consulting Firm',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Skin care',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Biotech',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Publisher',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Education',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Footwear',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Medical',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'industry',
          describe: 'Builders',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('Selects', null, {});
  },
};
