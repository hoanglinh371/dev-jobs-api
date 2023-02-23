const catchAsync = require('../utils/catchAsync');

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../services/auth.service');

exports.httpRegister = catchAsync(async (req, res, next) => {
  const { newUser, token } = await register(req.body);

  return res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.httpLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await login(email, password);

  return res.status(200).json({
    status: 'success',
    token,
  });
});

exports.httpForgotPassword = catchAsync(async (req, res, next) => {
  await forgotPassword(req.body.email, req);

  res.status(200).json({
    status: 'success',
    message: 'Token was sent to email.',
  });
});

exports.httpResetPassword = catchAsync(async (req, res, next) => {
  const { newPassword, newConfirmPassword } = req.body;
  const { resetToken } = req.params;
  const token = await resetPassword(
    resetToken,
    newPassword,
    newConfirmPassword,
  );

  res.status(200).json({
    status: 'success',
    token,
  });
});
