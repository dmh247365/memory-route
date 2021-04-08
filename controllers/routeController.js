const fs = require('fs');

const routes = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/routes-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(req.params);
  if (req.params.id * 1 > routes.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.svg) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or svg'
    });
  }
  next();
};



exports.getAllRoutes = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: routes.length,
    data: {
      routes
    }
  });
};

exports.getRoute = (req, res) => {

  const id = req.params.id * 1;
  const route = routes.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      route
    }
  });
}

exports.createRoute = (req, res) => {
  const newId = routes[routes.length - 1].id + 1;
  const newRoute = Object.assign({ id: newId }, req.body);

  routes.push(newRoute);
  fs.writeFile(
    `${__dirname}/dev-data/data/routes-simple.json`,
    JSON.stringify(routes),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          route: newRoute
        }
      });
    }
  );
};


exports.updateRoute = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      route: '<updated route here..>'
    }
  })
};

exports.deleteRoute = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
}