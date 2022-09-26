'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'post_id',
        references: {
          // Informa a tabela da referência da associação
          model: 'blog_posts',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'category_id',
        references: {
          // Informa a tabela da referência da associação
          model: 'categories',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};