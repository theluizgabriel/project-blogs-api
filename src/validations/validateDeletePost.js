const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');
const userService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

const validateDeletePost = async (token, id) => {
    const decoded = jwt.verify(token, secret);
    const post = await postService.getPostById(id);
    if (!post) return { error: 404, message: 'Post does not exist' };
    const user = await userService.findUserByEmail(decoded.data.email);
    if (post.dataValues.userId !== user.dataValues.id) {
        return { error: 401, message: 'Unauthorized user' };
    }
    return { error: null, message: '' };
};

module.exports = validateDeletePost;