const postService = require('../services/post.service');
const validatePost = require('../validations/validatePost');

const createPost = async (req, res) => {
    const validate = await validatePost(req.body);
    if (validate.error) return res.status(400).json({ message: validate.message });
    try {
    const token = req.header('Authorization');
    const newPost = await postService.createPost(req.body, token);
    return res.status(201).json(newPost);
    } catch (e) {
        return res.status(500).json({ error: 'error', message: e.message });
    }
};

module.exports = {
    createPost,
};