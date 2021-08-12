import { NextFunction, Request, Response } from 'express';
import { Exception } from 'ts-httpexceptions';

export function handleExceptions(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof Exception) {
    const { name, type, status } = error;
    return response.status(status).send({ name, type });
  }
  next();
}
