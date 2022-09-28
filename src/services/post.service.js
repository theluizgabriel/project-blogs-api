const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory } = require('../models');
const userService = require('./user.service');

const secret = process.env.JWT_SECRET;

const getAllPosts = async () => {
    const posts = BlogPost.findAll();
    return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({ where: { id } });
    const user = await userService.getUserById(post.userId);
    const categories = await PostCategory.findOne({ where: { postId: id } });
    return (post, { user, categories });
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