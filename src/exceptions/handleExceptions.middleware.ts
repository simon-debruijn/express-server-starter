import { logger } from '@logging/logger';
import { NextFunction, Request, Response } from 'express';
import { Exception as HttpException } from 'ts-httpexceptions';
import { Exception } from './Exception';
import { ValidationException } from './ValidationException';

export const handleExceptions = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof HttpException) {
    logger.info(error);
    const { status, message, type, name } = error;
    return response.status(error.status).send({ status, name, message, type });
  }
  if (error instanceof ValidationException) {
    logger.info(error);
    const { name, message, stack, cause } = error;
    return response.status(400).send({ name, message, stack, cause });
  }
  if (error instanceof Exception) {
    logger.warn(error);
    const { name, message, stack } = error;
    return response.status(400).send({ name, message, stack });
  }
  next(error);
};
