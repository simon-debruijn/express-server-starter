import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import os from 'os';

import { helloRouter } from './hello/hello.router';
import { usersRouter } from './users/users.router';

import { handleExceptions } from './exceptions/handleExceptions.middleware';
import { handleServerErrors } from './errors/handleServerErrors.middleware';

import config from './config.json';
import { logger } from '@logging/logger';

// set the UV_THREADPOOL_SIZE to the numbers of threads of the machine
process.env.UV_THREADPOOL_SIZE = `${os.cpus().length ?? 4}`;

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.origins }));
app.use(express.json());

app.use('/hello', helloRouter);
app.use('/users', usersRouter);

app.use(handleExceptions);
app.use(handleServerErrors);

const exitProgram = (err: Error): never => {
  logger.error(err);
  process.exit(1);
};

process.on('uncaughtException', exitProgram);
process.on('unhandledRejection', exitProgram);
