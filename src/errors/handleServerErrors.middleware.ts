import { NextFunction, Request, Response } from 'express';

export function handleServerErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.status(500).send('Internal server error');
}
