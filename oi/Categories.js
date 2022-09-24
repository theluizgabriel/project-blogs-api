// src/models/Categories.js

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'categories',
  });

  Categories.associate = (models) => {
    Categories.hasOne(models.PostsCategories,
      { foreignKey: 'category_id', as: 'posts_categories' });
  }

  return Categories;
};