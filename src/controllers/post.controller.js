const postService = require('../services/post.service');

const createPost = async (req, res) => {
    try {
    const { title, content, categoryIds } = req.body;
    const newCategory = await postService
    .createPost({ 
        title,
        content,
        categoryIds, 
        published: `${new Date()}`, 
        updated: `${new Date()}` });
    return res.status(201).json(newCategory);
    } catch (e) {
        return res.status(500).json({ message: 'ERRO!', error: e.message });
    }
};

module.exports = {
    createPost,
};