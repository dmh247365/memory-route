const Route = require('../models/routeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHome = catchAsync(async (req, res) => {
  res.status(200).render('home', {
    title: 'Home'
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  // 1 - get route data from collection
  const routes = await Route.find();

  // 2 - build template

  // 3 - render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Routes',
    routes
  });
});

exports.getLearning = catchAsync(async (req, res) => {
  // 1 - get route data from collection
  const routes = await Route.find();

  // 2 - build template

  // 3 - render that template using tour data from 1)
  res.status(200).render('learning', {
    title: 'All Routes'
  });
});

exports.getRoute = catchAsync(async (req, res, next) => {
  console.log('hi im in the get route views controller');
  const route = await Route.findOne({ slug: req.params.slug });
  if (!route) {
    return next(new AppError(404, 'There is no route with that name!'));
  }
  res.status(200).render('route', {
    route
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
