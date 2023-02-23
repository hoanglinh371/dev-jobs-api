const catchAsync = require('../utils/catchAsync');

const { getUsers, deleteUser } = require('../services/user.service');

exports.httpGetUsers = catchAsync(async (req, res, next) => {
  const users = await getUsers();

  return res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.httpDeleteUser = catchAsync(async (req, res, next) => {
  await deleteUser(req.params._id);

  return res.status(204).json({
    status: 'success',
    data: null,
  });
});
