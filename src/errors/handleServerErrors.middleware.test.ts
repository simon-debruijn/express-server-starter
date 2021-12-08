import { NextFunction, Request, Response } from 'express';
import { handleServerErrors } from './handleServerErrors.middleware';

describe('handleServerErrors.middleware', () => {
  let request: Request, response: Response, next: NextFunction;

  beforeEach(() => {
    request = {} as unknown as Request;
    response = {
      status: jest.fn(() => response),
      send: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
    console.error = jest.fn();
  });

  test('handleServerErrors should send a response if an error is passed', () => {
    const error = new Error('Server error');
    handleServerErrors(error, request, response, next);

    expect(console.error).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(500);
    expect(response.send).toBeCalledWith('Internal server error');
  });
});
