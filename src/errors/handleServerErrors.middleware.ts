import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'ts-httpexceptions';

export function handleServerErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.error(error);
  const { status, message, type, name } = new InternalServerError(
    'Internal Server Error',
  );
  response.status(status).send({ status, message, type, name });
}
