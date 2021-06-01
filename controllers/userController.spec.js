const userController = require('./userController');
const User = require('../models/userModel');
const mockRouteList = require('../test/mockData/mockRoute-simple.json');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const httpMock = require('node-mocks-http');

let next, req, res;

beforeEach(() => {
  next = null;
  req = httpMock.createRequest();
  res = httpMock.createResponse();
});

// afterEach(() => {
//   User.find.mockClear();
//   User.findByIdAndUpdate();
// });

// need to validate the internal functiom filterObj

describe('getAllUsers', () => {
  it('Should be defined', () => {
    expect(userController.getAllUsers).toBeDefined();
  });

  it('should return all Users', async () => {
    // arrange
    User.find = jest.fn().mockReturnValue([{}, {}]);

    // act
    const result = await userController.getAllUsers(req, res, next);

    // assert
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData().status).toBe('success');
    expect(res._getJSONData().results).toBe(2);
    expect(res._getJSONData().data.users).toStrictEqual([{}, {}]);
  });

  it.only('should return a blank array when no users found', async () => {
    // arrange
    User.find = jest.fn().mockReturnValue([]);

    // act
    const result = await userController.getAllUsers(req, res, next);

    // assert
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData().status).toBe('success');
    expect(res._getJSONData().results).toBe(0);
    expect(res._getJSONData().data.users).toStrictEqual([]);
  });
});

/// need to put in updatetMe // ******************
// *****************************

describe('updateMe', () => {
  it('Should be defined', () => {
    expect(userController.updateMe).toBeDefined();
  });

  it('should return error message (passwordConfirm present) - This route is not for password updates', async () => {
    // arrange
    // req.body.password = 'password';
    req.body.passwordConfirm = 'passwordConfirm';
    next = jest.fn();

    // act
    const result = await userController.updateMe(req, res, next);

    // assert
    expect(next).toBeCalledTimes(1);
    console.log('next ', next);
    expect(next).toHaveBeenCalledWith(
      new AppError(
        Error,
        'This route is not for password updates. please use /updateMyPassword.'
      )
    );
  });

  it('should return error message (password present) - This route is not for password updates', async () => {
    // arrange
    req.body.password = 'password';
    next = jest.fn();

    // act
    const result = await userController.updateMe(req, res, next);

    // assert
    expect(next).toBeCalledTimes(1);
    console.log('next ', next);
    expect(next).toHaveBeenCalledWith(
      new AppError(
        Error,
        'This route is not for password updates. please use /updateMyPassword.'
      )
    );
  });

  it('should update the user', async () => {
    // arrange
    req.user = {};
    req.user.id = '5c88fa8cf4adda39709c2101';

    req.body = {
      name: 'user1',
      email: 'email user1',
      test: 'test1',
      test: 'test2'
    };

    const filteredBody = {
      test: 'test1',
      test: 'test2'
    };

    User.findByIdAndUpdate = jest.fn();

    // act
    const result = await userController.updateMe(req, res, next);

    // assert
    // expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
    //   req.params.id,
    //   filteredBody
    // );
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData().status).toBe('success');
    // expect(res._getJSONData().data.user).toStrictEqual(mockRouteList[0]);
  });
});

/// need to put in updatedUser // ******************
// *****************************

describe('getUser', () => {
  it('Should be defined', () => {
    expect(userController.getUser).toBeDefined();
  });

  it('should return route not defined message', async () => {
    // arrange

    // act
    const result = await userController.getUser(req, res);

    // assert
    expect(res.statusCode).toEqual(500);
    expect(res._getJSONData().status).toBe('error');
    expect(res._getJSONData().message).toBe('This route is not yet defined!');
  });
});

describe('createUser', () => {
  it('Should be defined', () => {
    expect(userController.createUser).toBeDefined();
  });

  it('should return route not defined message', async () => {
    // arrange

    // act
    const result = await userController.createUser(req, res);

    // assert
    expect(res.statusCode).toEqual(500);
    expect(res._getJSONData().status).toBe('error');
    expect(res._getJSONData().message).toBe('This route is not yet defined!');
  });
});

/// need to put in deletMe // ******************
// *****************************

describe('updateUser', () => {
  it('Should be defined', () => {
    expect(userController.updateUser).toBeDefined();
  });

  it('should return route not defined message', async () => {
    // arrange

    // act
    const result = await userController.updateUser(req, res);

    // assert
    expect(res.statusCode).toEqual(500);
    expect(res._getJSONData().status).toBe('error');
    expect(res._getJSONData().message).toBe('This route is not yet defined!');
  });
});

describe('deleteUser', () => {
  it('Should be defined', () => {
    expect(userController.deleteUser).toBeDefined();
  });

  it('should return route not defined message', async () => {
    // arrange

    // act
    const result = await userController.deleteUser(req, res);

    // assert
    expect(res.statusCode).toEqual(500);
    expect(res._getJSONData().status).toBe('error');
    expect(res._getJSONData().message).toBe('This route is not yet defined!');
  });
});
