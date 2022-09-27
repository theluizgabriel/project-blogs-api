const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    try {
    const { body } = req;
    if (!body.name) { return res.status(400).json({ message: '"name" is required' }); }
    const newCategory = await categoryService.createCategory(body);
    return res.status(201).json(newCategory);
    } catch (e) {
        return res.status(500).json({ message: 'ERRO!', error: e.message });
    }
};

module.exports = { createCategory };