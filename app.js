const express = require('express');
const logger = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const routeRouter = require('./routes/routeRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  //console.log('Im the request header ', req.headers);
  next();
});

app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
