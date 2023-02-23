const express = require('express');

const { httpRegister, httpLogin } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/registration', httpRegister);
authRouter.post('/login', httpLogin);

module.exports = authRouter;
