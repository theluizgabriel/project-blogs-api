const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');
const userService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

const validatePost = async (body, token, id) => {
    const decoded = jwt.verify(token, secret);
    const { title, content } = body;
    if (!title || !content) {
        return { error: 400, message: 'Some required fields are missing' }; 
    }
    const post = await postService.getPostById(id);
    const user = await userService.findUserByEmail(decoded.data.email);
    if (post.dataValues.userId !== user.dataValues.id) {
        return { error: 401, message: 'Unauthorized user' };
    }
    return { error: null, message: '' };
};

module.exports = validatePost;