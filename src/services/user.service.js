const { User } = require('../models');

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
};