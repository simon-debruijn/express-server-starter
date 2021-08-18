import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { BadRequest } from 'ts-httpexceptions';
import { Exception } from './Exception';
import { handleExceptions } from './handleExceptions.middleware';
import { ValidationException } from './ValidationException';

describe('handleExceptions.middleware', () => {
  let request: Request, response: Response, next: NextFunction;

  beforeEach(() => {
    request = {} as unknown as Request;
    response = {
      status: jest.fn(() => response),
      send: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  test('handleExceptions should send response when it is an instance of HttpException', async () => {
    const exception = new BadRequest('This is a bad request');
    await handleExceptions(exception, request, response, next);
    const { status, name, message, type } = exception;
    expect(response.status).toBeCalledWith(exception.status);
    expect(response.send).toBeCalledWith({ status, name, message, type });
  });

  test('handleExceptions should send response when it is an instance of ValidationException', async () => {
    const exception = new ValidationException("The input wasn't valid");
    await handleExceptions(exception, request, response, next);
    const { name, message, stack, errors } = exception;
    expect(response.send).toBeCalledWith({ name, message, stack, errors });
  });

  test('handleExceptions should send response when it is an instance of Exception', async () => {
    const exception = new Exception("The input wasn't valid");
    await handleExceptions(exception, request, response, next);
    const { name, message, stack } = exception;
    expect(response.send).toBeCalledWith({ name, message, stack });
  });

  test('handleExceptions should call next when it is none of the above', async () => {
    const error = new Error('this is a server error');
    await handleExceptions(error, request, response, next);
    expect(next).toBeCalledWith(error);
  });
});
