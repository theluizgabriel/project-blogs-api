// src/models/users.js

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('blog_posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    image: DataTypes.STRING,
  },
  {
    timestamps: true, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'blog_posts',
    updatedAt: 'updated',
    createdAt: 'published',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.hasMany(models.Users,
      { foreignKey: 'user_id', as: 'users' });
  };

  return BlogPosts;
};