import { NextFunction, Request, Response } from 'express';
import { Exception as HttpException } from 'ts-httpexceptions';
import { Exception } from './Exception';
import { ValidationException } from './ValidationException';

export async function handleExceptions(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof HttpException) {
    const { status, message, type, name } = error;
    return response.status(error.status).send({ status, name, message, type });
  }
  if (error instanceof ValidationException) {
    const { name, message, stack, errors } = error;
    return response.status(400).send({ name, message, stack, errors });
  }
  if (error instanceof Exception) {
    const { name, message, stack } = error;
    return response.status(400).send({ name, message, stack });
  }
  next(error);
}
