const catchAsync = require('../utils/catchAsync');

const { register, login } = require('../services/auth.service');

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
