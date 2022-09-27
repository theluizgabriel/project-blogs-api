const { Category } = require('../models');

const createCategory = async ({ name }) => {
    const category = await Category.create({ name });
    return category;
};

const getAllCategories = async () => {
    const categories = await Category.findAll();
    const map = categories.map((category) => category.dataValues);
    return map;
};

module.exports = { createCategory, getAllCategories };