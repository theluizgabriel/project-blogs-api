// src/models/Users.js

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'users',
    underscored: true,
  });

  Users.associate = (models) => {
    Users.hasMany(models.blogPosts,
      { foreignKey: 'user_id', as: 'blog_posts' });
  };

  return Users;
};