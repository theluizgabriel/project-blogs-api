const express = require('express');
const Login = require('./routers/login.router');
const User = require('./routers/user.router');
const loginValidation = require('./middlewares/loginValidation');
const createUserValidation = require('./middlewares/createUserValidation');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginValidation, Login);

app.use('/user', createUserValidation, User);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
