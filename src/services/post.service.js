const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, User, Category } = require('../models');
const userService = require('./user.service');

const secret = process.env.JWT_SECRET;

const getAllPosts = async () => {
    const posts = BlogPost.findAll();
    return posts;
};

const getPostById = async (id) => {
    const posts = await BlogPost.findOne({
        where: { id },
        include: [{ model: User,
        as: 'users', 
        attributes: { exclude: ['password'] },
      },
         { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      return posts;
};

const insertPostsCategories = async (categoryIds, postId) => {
  const categories = categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
});
    return Promise.all(categories);
};

const createPost = async (body, token) => {
    const { title, content, categoryIds } = body;
    const decoded = jwt.verify(token, secret);
    const user = await userService.findUserByEmail(decoded.data.email);
    const newPost = await BlogPost.create({
        userId: Number(user.dataValues.id),
        title,
        content,
        categoryIds, 
        published: `${new Date()}`, 
        updated: `${new Date()}` });
    await insertPostsCategories(categoryIds, newPost.dataValues.id);
    return newPost;
};

module.exports = {
    createPost,
    insertPostsCategories,
    getAllPosts,
    getPostById,
};