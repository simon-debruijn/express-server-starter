import express from 'express';
import dotenv from 'dotenv';
import { helloRouter } from './hello/hello.router';
import { handleExceptions } from './exceptions/handleExceptions.middleware';
import { handleServerErrors } from './errors/handleServerErrors.middleware';

dotenv.config();

export const app = express();

app.use(express.json());

app.use('/hello', helloRouter);

app.use(handleExceptions);
app.use(handleServerErrors);
