const express = require('express');

const {
  httpGetUsers,
  httpDeleteUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.route('/').get(httpGetUsers);
userRouter.route('/:_id').delete(httpDeleteUser);

module.exports = userRouter;
