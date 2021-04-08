const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');

const routeRouter = require('./routes/routeRoutes');
const userRouter = require('./routes/userRoutes');




app = express();

app.use(logger('dev'));
app.use(express.json());


app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/users', userRouter);



module.exports = app;