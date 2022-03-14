import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'ts-httpexceptions';
import { handleServerErrors } from './handleServerErrors.middleware';
import { logger as mockedLogger } from '@logging/logger';

jest.mock('@logging/logger', () => {
  return {
    logger: {
      error: jest.fn(),
    },
  };
});

describe('handleServerErrors.middleware', () => {
  let request: any, response: Response, next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();

    request = {} as unknown as Request;

    response = {
      status: jest.fn(() => response),
      send: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  test('handleServerErrors should send a response if an error is passed', () => {
    const error = new Error('Server error');
    handleServerErrors(error, request, response, next);

    expect(mockedLogger.error).toBeCalledTimes(1);

    const { status, message, type, name } = new InternalServerError(
      'Internal Server Error',
    );

    expect(response.status).toBeCalledWith(status);
    expect(response.send).toBeCalledWith({ status, message, type, name });
  });
});
