import { Router } from 'express';
import * as helloController from './hello.controller';

export const helloRouter = Router();

helloRouter.get('/', (req, res) => {
  const hello = helloController.getHello();
  res.send(hello);
});
