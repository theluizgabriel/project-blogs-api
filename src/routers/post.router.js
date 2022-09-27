const express = require('express');
const postController = require('../controllers/post.controller');
const validatePost = require('../middlewares/validatePost');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validatePost, validateJWT, postController.createPost);

module.exports = router;