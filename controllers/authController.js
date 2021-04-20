const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const { TooManyRequests } = require('http-errors');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // remove password from what is sent back when noew user is created
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role
  });
  createSendToken(newUser, 201, res);
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
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check of its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(401, 'You are not logged in! Please log in to get access!')
    );
  }

  // 2) verification of token
  //const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(401, 'The user belonging to this token no longer exists!')
    );
  }

  // 4) Check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(401, 'User recently changed password! Please log in again.')
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array. role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, 'You do not have permission to perform this action')
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 - get the user based on the given email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError(404, 'Invalid email address'));
  }
  console.log('forgot password user exists');
  // 2 - generate the random reset token
  const resetToken = user.createPasswordResetToken();
  console.log('im the reset token ', resetToken);
  console.log('im the user ', user);
  await user.save({ validateBeforeSave: false });
  console.log('im user2 ', user);
  // 3 - send it to users email
  console.log('req protocol: ', req.protocol);
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and
  passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password reset token (valid for 10 mins)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(500, 'There was an error sending email. Try again later!')
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() - 1000 }
  });

  // 2) if token has not expired, and there is a user, set password
  if (!user) {
    return next(new AppError(400, 'Token is invalid or has expired'));
  }
  // 3) Update changedPasswordAt property for the user
  console.log('yozzer is here');
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) log the user in, send the jwt to the client
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1 - get the user from the collection
  const user = await User.findById(req.user.id).select('+password');
  console.log('********* user', user);
  // 2 - check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(401, 'Your current password is wrong.'));
  }

  // 3 - if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4 - Log user in, send JWT
  createSendToken(user, 200, res);
});
