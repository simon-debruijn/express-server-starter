import { Request, Response } from 'express';
import * as helloRespository from './hello.inMemory.repository';

export function getHello(req: Request, res: Response) {
  const hello = helloRespository.getHello();
  res.send(hello);
}

export function getForbidden(req: Request, res: Response) {
  const forbidden = helloRespository.getForbidden();
  res.send(forbidden);
}
