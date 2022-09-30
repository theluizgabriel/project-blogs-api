const postService = require('../services/post.service');
const validatePost = require('../validations/validatePost');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json(posts);
        } catch (e) {
            return res.status(500).json({ error: 'error', message: e.message });
        }
};

const getPostById = async (req, res) => {
    try {
        const posts = await postService.getPostById(req.params.id);
        if (!posts) {
            return res.status(404).json({ message: 'Post does not exist' }); 
        }   
        return res.status(200).json(posts);
        } catch (e) {
            return res.status(500).json({ error: 'error', message: e.message });
        }
};

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
    getAllPosts,
    getPostById,
};