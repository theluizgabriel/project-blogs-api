const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    try {
    const { email } = req.body;

        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
            };

        const token = jwt.sign({ data: { email } }, secret, jwtConfig);
        await userService.createUser(req.body);

        return res.status(201).json({ token });
    } catch (e) {
        return res.status(500).json({ message: 'ERRO!', error: e.message });
    }
};

const getUsers = async (req, res) => {
    try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({ message: 'ERRO!', error: e.message });
        }
};

module.exports = { createUser, getUsers };