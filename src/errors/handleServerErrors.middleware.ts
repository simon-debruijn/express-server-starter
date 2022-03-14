import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'ts-httpexceptions';
import { logger } from '@logging/logger';

export const handleServerErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.error(error);

  const { status, message, type, name } = new InternalServerError(
    'Internal Server Error',
  );

  response.status(status).send({ status, message, type, name });
};
