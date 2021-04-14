const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = function (id, jwtSecret, jwtExpires) {};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email & password exist
  if (!email || !password) {
    return next(new AppError(400, 'Please provide email and password!'));
  }
  // 2) Check if user exists & password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, 'Incorrect email or password!'));
  }

  console.log(user);

  // 3) if everything is ok, send the json web token to the client
  const token = '';
  res.status(200).json({
    status: 'success',
    token
  });
});
