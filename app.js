const express = require('express');
const logger = require('morgan');

const routeRouter = require('./routes/routeRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());

app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
