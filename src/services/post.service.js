const { BlogPost } = require('../models');

const createPost = async ({ title, content, categoryIds, published, updated }) => {
    const newPost = await BlogPost.create({ title, content, categoryIds, published, updated });
    return newPost;
};

module.exports = {
    createPost,
};