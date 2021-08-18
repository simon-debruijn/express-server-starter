import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { IUser } from '../users/IUser';

export const sign = promisify<
  Pick<IUser, 'email'>,
  jwt.Secret,
  jwt.SignOptions | undefined,
  string
>(jwt.sign);

export const verify = promisify<
  string,
  jwt.Secret,
  jwt.VerifyOptions | undefined,
  IUser
>(jwt.verify);
