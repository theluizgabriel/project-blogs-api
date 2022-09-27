const express = require('express');
const categoryController = require('../controllers/category.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;