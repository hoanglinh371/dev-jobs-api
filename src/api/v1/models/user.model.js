const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: ['Please provide a password'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: ['Please confirm your password'],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: 'Password is not the same!',
      },
    },
    photo: {
      type: String,
      default: 'https://picsum.photos/60/60',
    },
    role: {
      type: String,
      enum: ['user', 'hr', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.correctPassword = async function (inpPwd, userPwd) {
  return await bcrypt.compare(inpPwd, userPwd);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
