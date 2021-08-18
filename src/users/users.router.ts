import { Router } from 'express';
import * as usersController from './users.controller';

export const usersRouter = Router();

usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);
