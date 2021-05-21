const routeController = require('./routeController');
const Route = require('../models/routeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const httpMocks = require('node-mocks-http');

Route.find = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('routeController.getRoute', () => {
  it('should have a getHome function', () => {
    // Arrange

    // Act

    // Assert
    expect(typeof routeController.getRoute).toBe('function');
    expect(res.statusCode).toBe(200);
    // expect(res._getRenderView()).toBeTruthy();
    // expect(res._getRenderData());
  });
});
