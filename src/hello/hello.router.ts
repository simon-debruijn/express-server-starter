import { Router } from 'express';
import { Forbidden } from 'ts-httpexceptions';
import * as helloController from './hello.controller';

export const helloRouter = Router();

helloRouter.get('/', (req, res) => {
  const hello = helloController.getHello();
  res.send(hello);
});

helloRouter.get('/forbidden', (req, res) => {
  throw new Forbidden('goodbye');
});
