const { User } = require('../models');

const getUsers = async () => {
    const findUsers = await User.findAll({ attributes: { exclude: ['password'] } });
    return findUsers;
};

const findUserByEmail = async (email) => {
    const findUser = await User.findOne({ where: { email } });
    return findUser;
};

const createUser = async ({ displayName, email, password, image }) => {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
};

module.exports = {
    findUserByEmail,
    createUser,
    getUsers,
};