const express = require('express');

const {
  httpRegister,
  httpLogin,
  httpForgotPassword,
  httpResetPassword,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/registration', httpRegister);
authRouter.post('/login', httpLogin);
authRouter.post('/forgot-password', httpForgotPassword);
authRouter.post('/reset-password/:resetToken', httpResetPassword);

module.exports = authRouter;
