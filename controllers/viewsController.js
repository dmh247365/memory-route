const Route = require('../models/routeModel');
const catchAsync = require('../utils/catchAsync');

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
exports.getRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findOne({ slug: req.params.slug });
  res.status(200).render('route', {
    title: 'Blarrrrg',
    route
  });
});
