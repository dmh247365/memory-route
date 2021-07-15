const httpMock = require('node-mocks-http');
const userController = require('./userController');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

let next;
let req;
let res;

beforeEach(() => {
  next = null;
  req = httpMock.createRequest();
  res = httpMock.createResponse();
});

describe.only('getAllUsers', () => {
  it('Should be defined', () => {
    expect(userController.getAllUsers).toBeDefined();
  });

  it('should return all Users', async () => {
    // arrange
    // User.find = jest.fn().mockReturnValue([{}, {}]);
    jest.spyOn(User, 'find');
    User.find.mockImplementation(() => [{}, {}]);

    // act
    const result = await userController.getAllUsers(req, res, next);
    console.log('result', result);

    // assert
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData().status).toBe('success');
    expect(res._getJSONData().results).toBe(2);
    expect(res._getJSONData().data.users).toStrictEqual([{}, {}]);
  });

  it('should return a blank array when no users found', async () => {
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

describe('updateMe', () => {
  it('Should be defined', () => {
    expect(userController.updateMe).toBeDefined();
  });

  it('should return error message (passwordConfirm present) - This route is not for password updates', async () => {
    // arrange
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
    expect(next).toHaveBeenCalledWith(
      new AppError(
        Error,
        'This route is not for password updates. please use /updateMyPassword.'
      )
    );
  });

  it('should updateMe', async () => {
    // arrange
    const safeUser = {
      testprop1: 'testprop1',
      testprop2: 'testprop2',
      testprop3: 'testprop3'
    };

    const user = {
      ...safeUser,
      name: 'blarrg',
      email: 'blarrge'
    };

    req.user = {};
    req.user.id = '5c88fa8cf4adda39709c2101';

    req.body = {
      name: 'user1',
      email: 'email user1',
      test1: 'test1',
      test2: 'test2'
    };

    // act
    const result = await userController.updateMe(req, res, next);
    // jest.spyOn()

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

describe('deleteMe', () => {
  it.todo('Should be defined');
  it.todo('Should return success');
  it.todo('clarify what happens when user cannot be found');
});

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
