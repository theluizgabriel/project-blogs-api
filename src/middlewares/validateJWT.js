// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

require('dotenv/config');
const userService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    const user = await userService.findUserByEmail(decoded.data.email);

    req.user = user.dataValues;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;
