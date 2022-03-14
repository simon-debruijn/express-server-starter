import { Request, Response } from 'express';
import * as helloRespository from './hello.inMemory.repository';

export const getHello = (req: Request, res: Response) => {
  const hello = helloRespository.getHello();
  res.send(hello);
};

export const getForbidden = (req: Request, res: Response) => {
  const forbidden = helloRespository.getForbidden();
  res.send(forbidden);
};
