import { Router } from 'express';
import { Forbidden } from 'ts-httpexceptions';
import { handleAuthentication } from '../users/handleAuthentication.middleware';
import * as helloController from './hello.controller';

export const helloRouter = Router();

helloRouter.get('/', helloController.getHello);

helloRouter.get(
  '/forbidden',
  handleAuthentication,
  helloController.getForbidden,
);
