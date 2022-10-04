const express = require('express');
const userController = require('../controllers/user.controller');
const createUserValidation = require('../middlewares/createUserValidation');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', createUserValidation, userController.createUser);
router.get('/', validateJWT, userController.getAllUsers);
router.delete('/me', validateJWT, userController.delUser);
router.get('/:id', validateJWT, userController.getUserById);

module.exports = router;