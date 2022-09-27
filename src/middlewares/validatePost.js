const categoryService = require('../services/category.service');

const validatePost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) { 
        return res.status(400).json({ message: 'Some required fields are missing' }); 
    }
    const categories = await categoryService.getAllCategories();
    const map = categories.map((cat) => cat.id);
    const some = categoryIds.some((el) => map.includes(el));
    if (some === false) {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return next();
};

module.exports = validatePost;