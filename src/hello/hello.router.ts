import { Router } from 'express';
import * as helloRespository from './hello.repository';

export const helloRouter = Router();

helloRouter.get('/', (req, res) => {
  const hello = helloRespository.getHello();
  res.send(hello);
});
