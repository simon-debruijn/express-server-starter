import * as jwt from 'jsonwebtoken';
import { IUser } from '../users/IUser';

export function sign(
  payload: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options: jwt.SignOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) return reject(err);
      return resolve(token ?? '');
    });
  });
}

export function verify(
  token: string,
  secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
  options?: jwt.VerifyOptions | undefined,
): Promise<IUser> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as unknown as IUser);
    });
  });
}
