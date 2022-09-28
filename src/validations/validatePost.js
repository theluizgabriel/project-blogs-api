const categoryService = require('../services/category.service');

const validatePost = async (body) => {
    const { title, content, categoryIds } = body;
    if (!title || !content || !categoryIds) { 
        console.log('erro 1');
        return { error: 400, message: 'Some required fields are missing' }; 
    }
    const categories = await categoryService.getAllCategories();
    const map = categories.map((cat) => cat.id);
    const every = categoryIds.every((el) => map.includes(el));
    if (every === false) {
        console.log('erro 2');
        return { error: 400, message: '"categoryIds" not found' };
    }
    return { error: null, message: '' };
};

module.exports = validatePost;