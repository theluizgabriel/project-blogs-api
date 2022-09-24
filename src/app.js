const express = require('express');
const Login = require('./routers/login.router');
const loginValidation = require('./middlewares/loginValidation');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginValidation, Login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
