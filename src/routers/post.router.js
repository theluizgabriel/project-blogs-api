const express = require('express');
const postController = require('../controllers/post.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, postController.createPost);

module.exports = router;