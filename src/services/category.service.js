const { Category } = require('../models/Category');

const createCategory = async ({ name }) => {
    const category = await Category.create({ name });
    return category;
};

module.exports = { createCategory };