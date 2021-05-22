const routeController = require('../../controllers/routeController');
const Route = require('../../models/routeModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
const request = require('supertest');
const app = require('../../app');

Route.findById = jest.fn().mockReturnValue(true);

it('routeController.getAllRoutes', () => {
  expect(typeof routeController.getAllRoutes).toBe('function');

  // expect(res.status).toBe(200);
  // expect(res.body.status).toBe('success');
});

// thoughts
// 1 - we the getRoute() async fn which returns
