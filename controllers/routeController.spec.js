const httpMock = require('node-mocks-http');
const routeController = require('./routeController');
const Route = require('../models/routeModel');
const mockRouteList = require('../dev-data/data/routes-simple.json');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
// const request = require('supertest');

let next;
let req;
let res;

beforeEach(() => {
  next = null;
  req = httpMock.createRequest();
  res = httpMock.createResponse();
});

describe('getAllRoutes', () => {
  it('Should be defined', () => {
    expect(routeController.getAllRoutes).toBeDefined();
  });
});

describe('getRoute', () => {
  it('Should be defined', () => {
    expect(routeController.getRoute).toBeDefined();
  });

  it('should return route', async () => {
    // arrange
    req.params.id = mockRouteList[0].id;
    Route.findById = jest.fn().mockReturnValue(mockRouteList[0]);

    // act
    const result = await routeController.getRoute(req, res, next);

    // assert
    expect(Route.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().status).toBe('success');
    expect(res._getJSONData().data.route).toStrictEqual(mockRouteList[0]);
  });

  it('should return 404 No route found with that ID', async () => {
    // arrange
    req.params.id = mockRouteList[0].id;
    Route.findById = jest.fn();
    next = jest.fn();

    // act
    const result = await routeController.getRoute(req, res, next);
    console.log('result: ', result);

    // assert
    expect(next).toBeCalledTimes(1);
    console.log('next ', next);
    expect(next).toHaveBeenCalledWith(
      new AppError(Error, 'No route found with that ID')
    );
  });
});

describe('createRoute', () => {
  it('Should be defined', () => {
    expect(routeController.createRoute).toBeDefined();
  });
});

describe('updateRoute', () => {
  it('Should be defined', () => {
    expect(routeController.updateRoute).toBeDefined();
  });
});

describe('deleteRoute', () => {
  it('Should be defined', () => {
    expect(routeController.deleteRoute).toBeDefined();
  });

  it.only('should return route', async () => {
    // arrange
    req.params.id = mockRouteList[0].id;
    Route.findByIdAndDelete = jest.fn().mockReturnValue(mockRouteList[0]);

    // act
    const result = await routeController.deleteRoute(req, res, next);

    // assert
    console.log(result);
    expect(Route.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(204);
    expect(res._getJSONData().status).toBe('success');
    expect(res._getJSONData().data).toBe(null);
  });

  it('should return 404 No route found with that ID', async () => {
    // arrange
    req.params.id = mockRouteList[0].id;
    Route.findByIdAndDelete = jest.fn();
    next = jest.fn();

    // act
    const result = await routeController.deleteRoute(req, res, next);
    console.log('result: ', result);

    // assert
    expect(next).toBeCalledTimes(1);
    console.log('next ', next);
    expect(next).toHaveBeenCalledWith(
      new AppError(Error, 'No route found with that ID')
    );
  });
});
