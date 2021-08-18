import { getForbidden, getHello } from './hello.controller';
import { Request, Response } from 'express';

describe('hello.controller', () => {
  let request: Request, response: Response;

  beforeEach(() => {
    request = {} as unknown as Request;
    response = {
      send: jest.fn(),
    } as unknown as Response;
  });

  test("getHello sends { hello: 'world' } as response", () => {
    getHello(request, response);
    expect(response.send).toBeCalledWith({ hello: 'world' });
  });

  test("getForbidden send 'You were granted access' as response", () => {
    getForbidden(request, response);
    expect(response.send).toBeCalledWith('You were granted access');
  });
});
