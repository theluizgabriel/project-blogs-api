const { User } = require('../models');

const getAllUsers = async () => {
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

const getUserById = async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    return user;
};

const delUser = async (user) => {
    const destroy = await User.destroy({ where: { id: user.id } });
    return destroy;
};

module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
    getUserById,
    delUser,
};