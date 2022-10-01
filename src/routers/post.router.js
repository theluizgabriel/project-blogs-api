const express = require('express');
const postController = require('../controllers/post.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.delete('/:id', validateJWT, postController.delPost);
router.put('/:id', validateJWT, postController.putPost);
router.get('/:id', validateJWT, postController.getPostById);
router.get('/', validateJWT, postController.getAllPosts);
router.post('/', validateJWT, postController.createPost);

module.exports = router;