const path = require('path');
const express = require('express');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const routeRouter = require('./routes/routeRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'data', 'ws:'],
      fontSrc: ['https:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'blob:'],
      styleSrc: ["'self'", 'https:', 'unsafe-inline']
    }
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP please try again in an hour!'
});

app.use('/api', limiter);

// Body parser for reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution (no whitelist at the moment)
app.use(hpp());

// Test middleware
app.use((req, res, next) => {
  //console.log('Im the request header ', req.headers);
  next();
});

// Routes
app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/users', userRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
