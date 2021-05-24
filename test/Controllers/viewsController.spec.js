const viewsController = require('../../controllers/viewsController');
const Route = require('../../models/routeModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const request = require('supertest');

Route.find = jest.fn();

let req, res, next;
beforeEach(() => {});

describe.skip('viewsController.getHome', () => {
  it('should have a getHome function', () => {
    // Arrange

    // Act
    let renderedView = 'home';
    // Assert
    expect(typeof viewsController.getHome).toBe('function');
    expect(res.statusCode).toBe(200);
    // expect(res._getRenderView()).toBe(renderedView);
    // expect(res._getRenderData());
  });
});
describe.skip('viewsController.getOverview', () => {
  it('should have a getOverview function', () => {
    expect(typeof viewsController.getOverview).toBe('function');
  });
  // it('should call Route.find', () => {
  //   viewsController.getOverview(req, res);

  //   expect(Route.find).toBeCalled();
  // });
  it('should return 200 response code', () => {
    const routes = {};
    viewsController.getOverview(req, res);
    expect(res.statusCode).toBe(200);
    // expect(res._isEndCalled()).toBeTruthy();
  });
});