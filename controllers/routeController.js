const Route = require('../models/routeModel');
// const { route } = require('../routes/routeRoutes');

// const routes = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/routes-simple.json`)
// );

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();

    res.status(200).json({
      status: 'success',
      results: routes.length,
      data: {
        routes
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        route
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const newRoute = await Route.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        route: newRoute
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        route
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
