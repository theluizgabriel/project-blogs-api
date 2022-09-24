const userService = require('../services/user.service');

const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const user = await userService.getLogin(email);
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    return next();
};

module.exports = loginValidation;