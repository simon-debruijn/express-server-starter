import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

import { helloRouter } from './hello/hello.router';
import { usersRouter } from './users/users.router';

import { handleExceptions } from './exceptions/handleExceptions.middleware';
import { handleServerErrors } from './errors/handleServerErrors.middleware';

dotenv.config();

export const app = express();

app.use(compression());
app.use(express.json());
app.use(helmet());

app.use('/hello', helloRouter);
app.use('/users', usersRouter);

app.use(handleExceptions);
app.use(handleServerErrors);
