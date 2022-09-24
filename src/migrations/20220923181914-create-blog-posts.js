'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'published'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};