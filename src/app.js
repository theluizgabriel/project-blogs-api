const express = require('express');
const Login = require('./routers/login.router');
const User = require('./routers/user.router');
const Categories = require('./routers/category.router');
const Post = require('./routers/post.router');
const loginValidation = require('./middlewares/loginValidation');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginValidation, Login);

app.use('/user', User);

app.use('/categories', Categories);

app.use('/post', Post);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
