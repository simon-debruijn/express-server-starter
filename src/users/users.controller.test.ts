import { NextFunction, Request, Response } from 'express';
import { Exception } from '../exceptions/Exception';
import { ValidationException } from '../exceptions/ValidationException';
import { register } from './users.controller';
import * as usersRespository from './users.inMemory.repository';

describe('users.controller', () => {
  let request: Request,
    response: Response,
    next: NextFunction,
    exception: ValidationException | Exception | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseBody: any | null;
  const validEmail = 'test@test.com';
  const validPassword = 'gjhfjghfygz';

  beforeEach(() => {
    exception = null;
    responseBody = null;

    request = {} as unknown as Request;
    response = {
      send: jest.fn((res) => {
        responseBody = res;
      }),
    } as unknown as Response;
    next = jest.fn((err) => {
      if (err) exception = err;
    }) as unknown as NextFunction;

    process.env = { JWT_SECRET: 'shhhhh' };

    usersRespository.clearAllUsers();
  });

  test('register should call next with a validation exception when email is not valid', async () => {
    request.body = { email: '', password: validPassword };

    await register(request, response, next);

    expect(next).toBeCalledWith(exception);
    expect(exception).toBeInstanceOf(ValidationException);
    expect(exception?.message).toEqual('User data is not valid');

    // to let typescript know it is a ValidationException
    if (!exception || !(exception instanceof ValidationException)) {
      expect(false).toEqual(true);
      return;
    }

    const constraints = exception?.errors?.find(
      (err) => err.property === 'email',
    )?.constraints;

    expect(Object.values(constraints ?? [])).toContain(
      'email must be an email',
    );
  });

  test('register should call next with a validation exception when password contains password', async () => {
    request.body = { email: validEmail, password: 'password' };

    await register(request, response, next);

    expect(next).toBeCalledWith(exception);
    expect(exception).toBeInstanceOf(ValidationException);
    expect(exception?.message).toEqual('User data is not valid');

    // to let typescript know it is a ValidationException
    if (!exception || !(exception instanceof ValidationException)) {
      expect(false).toEqual(true);
      return;
    }

    const constraints = exception?.errors?.find(
      (err) => err.property === 'password',
    )?.constraints;

    expect(Object.values(constraints ?? [])).toContain(
      'password should not contain a password string',
    );
  });

  test("register should call next with a validation exception when password contains '1234'", async () => {
    request.body = { email: validEmail, password: 'test1234' };

    await register(request, response, next);

    expect(next).toBeCalledWith(exception);
    expect(exception).toBeInstanceOf(ValidationException);
    expect(exception?.message).toEqual('User data is not valid');

    // to let typescript know it is a ValidationException
    if (!exception || !(exception instanceof ValidationException)) {
      expect(false).toEqual(true);
      return;
    }

    const constraints = exception?.errors?.find(
      (err) => err.property === 'password',
    )?.constraints;

    expect(Object.values(constraints ?? [])).toContain(
      'password should not contain a 1234 string',
    );
  });

  test('register should call next with a validation exception when password is shorter than 6 characters', async () => {
    request.body = { email: validEmail, password: 'test' };

    await register(request, response, next);

    expect(next).toBeCalledWith(exception);
    expect(exception).toBeInstanceOf(ValidationException);
    expect(exception?.message).toEqual('User data is not valid');

    // to let typescript know it is a ValidationException
    if (!exception || !(exception instanceof ValidationException)) {
      expect(false).toEqual(true);
      return;
    }

    const constraints = exception?.errors?.find(
      (err) => err.property === 'password',
    )?.constraints;

    expect(Object.values(constraints ?? [])).toContain(
      'password must be longer than or equal to 6 characters',
    );
  });

  test('register should call next with an exception when the user already exists', async () => {
    request.body = { email: validEmail, password: validPassword };

    await register(request, response, next);

    await register(request, response, next);

    expect(exception?.message).toEqual('User already exists');
  });

  test('register should send a response with the new user without password and the token', async () => {
    request.body = { email: validEmail, password: validPassword };

    await register(request, response, next);

    expect(typeof responseBody.token).toEqual('string');
    expect(typeof responseBody.user.email).toEqual('string');
    expect(responseBody.user.password).not.toBeDefined();
    expect(Array.isArray(responseBody.user.tokens)).toBeTruthy();
    expect(typeof responseBody.user.tokens[0]).toEqual('string');
  });
});
