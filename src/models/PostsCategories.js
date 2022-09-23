// src/models/PostsCategories.js

module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('posts_categories', {
    post_id: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    category_id: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
  });

  PostsCategories.associate = (models) => {
    PostsCategories.hasOne(models.BlogPosts,
      { foreignKey: 'post_id', as: 'blog_posts' });
  }

  PostsCategories.associate = (models) => {
    PostsCategories.hasOne(models.Categories,
      { foreignKey: 'category_id', as: 'categories' });
  }

  return PostsCategories;
}