// src/models/PostCategory.js

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory, 
      foreignKey: 'postId', 
      as: 'blog_posts',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory, 
      foreignKey: 'postId', 
      as: 'posts_categories',
      otherKey: 'categoryId',
    });
  }

  return PostCategory;
}