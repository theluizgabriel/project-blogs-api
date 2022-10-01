const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, User, Category } = require('../models');
const userService = require('./user.service');

const secret = process.env.JWT_SECRET;

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ 
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
         { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      return posts;
};

const getPostById = async (id) => {
    const posts = await BlogPost.findOne({
        where: { id },
        include: [{ 
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
         { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      return posts;
};

const createPost = async (body, token) => {
    const { title, content, categoryIds } = body;
    const decoded = jwt.verify(token, secret);
    const user = await userService.findUserByEmail(decoded.data.email);
    const newPost = await BlogPost.create({
        title,
        content,
        userId: user.dataValues.id,
        categoryIds, 
        published: `${new Date()}`, 
        updated: `${new Date()}` });
        const categories = categoryIds.map((categoryId) => ({
            postId: newPost.dataValues.id,
            categoryId,
        }));
        await PostCategory.bulkCreate(categories);
    return newPost;
};

const putPost = async (body, id) => {
    const { title, content } = body;
    await BlogPost.update(
        { 
          title, 
          content, 
          updated: new Date(), 
        }, {
        where: { id },    
},
);
    const update = getPostById(id);
    return update;
};

const delPost = async (id) => {
    const post = BlogPost.destroy({ where: { id } });
    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    putPost,
    delPost,
};