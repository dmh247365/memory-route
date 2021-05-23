const Route = require('../models/routeModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllRoutes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Route.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const routes = await features.query;

  res.status(200).json({
    status: 'success',
    results: routes.length,
    data: {
      routes
    }
  });
});

exports.getRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findById(req.params.id);

  if (!route) {
    return next(new AppError(404, 'No route found with that ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      route
    }
  });
});

exports.createRoute = catchAsync(async (req, res, next) => {
  const newRoute = await Route.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      route: newRoute
    }
  });
  if (!newRoute) {
    return next(new AppError(404, 'No route found with that ID'));
  }
});

exports.updateRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!route) {
    return next(new AppError(404, 'No route found with that ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      route
    }
  });
});

exports.deleteRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findByIdAndDelete(req.params.id);

  if (!route) {
    return next(new AppError(404, 'No route found with that ID'));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
