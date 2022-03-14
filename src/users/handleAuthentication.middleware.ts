import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'ts-httpexceptions';
import * as usersRepository from '../users/users.inMemory.repository';
import * as jwtProvider from '../jwts/jwt.provider';
import { JWT_SECRET } from '../constants';

export const handleAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token?.startsWith('Bearer ')) {
      throw new Error('');
    }

    const tokenWithoutPrefix = token.split('Bearer ')[1];

    // verify token with secret
    const decoded = await jwtProvider.verify(tokenWithoutPrefix, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    const { email } = decoded;

    const user = usersRepository.findUser({ email });

    // check if user is in users
    if (!user) {
      throw new Error('');
    }
    // call next if ok
    next();
  } catch (err: any) {
    next(new Unauthorized('Was unable to authenticate'));
  }
};
