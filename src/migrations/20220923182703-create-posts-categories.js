'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};