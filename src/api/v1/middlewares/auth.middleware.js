const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(401, 'You are not log in! Please log in!'));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const user = await User.findById(decoded._id);
  if (!user) {
    return next(
      new AppError(
        404,
        'The user belonging to this token does no longer exist.',
      ),
    );
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(401, 'User recently changed password! Please log in again.'),
    );
  }
  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, 'You do not have permission to perform this action'),
      );
    }

    next();
  };
};
