const Joi = require('joi');
const userService = require('../services/user.service');

const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const createUserValidation = async (req, res, next) => {
    const { body } = req;
    const user = await userService.findUserByEmail(body.email);
    if (user) {
        return res.status(409).json({ message: 'User already registered' });
    }
    const joiValidate = userSchema.validate(body);
    if (joiValidate.error !== undefined) {
      const error = joiValidate.error.details[0].message;
      return res.status(400).json({ message: error });
    }
    if (emailRegex.test(body.email) === false) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    return next();
};

module.exports = createUserValidation;