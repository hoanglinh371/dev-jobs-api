const User = require('../models/user.model');
const AppError = require('../utils/AppError');

exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

exports.deleteUser = async (_id) => {
  const user = await User.findByIdAndDelete(_id);
  if (!user) {
    throw new AppError(404, 'No user found with ID');
  }

  return null;
};
