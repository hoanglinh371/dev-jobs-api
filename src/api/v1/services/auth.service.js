const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const AppError = require('../utils/AppError');

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (user) => {
  const newUser = await User.create(user);
  const token = signToken(newUser._id);

  return { newUser, token };
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new AppError(400, 'Please provide email and password');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError(401, 'Incorrect email or password');
  }
  const token = signToken(user._id);

  return token;
};
