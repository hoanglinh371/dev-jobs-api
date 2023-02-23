const crypto = require('crypto');

const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const signToken = require('../utils/token.utils');
const sendEmail = require('../utils/email');

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

exports.forgotPassword = async (email, req) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'There is no user with email address.');
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.hostname}:8080/api/v1/auth/reset-password/${resetToken}`;
  const message = `Forgot your password? ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
    throw new AppError(
      500,
      'There was an error sending email. Try again later!',
    );
  }
};

exports.resetPassword = async (resetToken, newPwd, newConfirmPwd) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new AppError(400, 'Token is invalid or expired.');
  }

  user.password = newPwd;
  user.confirmPassword = newConfirmPwd;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);

  return token;
};
