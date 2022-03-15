import { IUser } from './IUser';
import * as jwtProvider from '../jwts/jwt.provider';
import bcrypt from 'bcrypt';
import { BadRequest } from 'ts-httpexceptions';
import { JWT_SECRET } from '../constants';
import { AllowedPropertiesException } from '../exceptions/AllowedPropertiesException';
import { arePropertiesAllowed } from '../utilities/arePropertiesAllowed';

let users: IUser[] = [];

export const clearAllUsers = async () => {
  users = [];
};

export const addUser = async ({
  email,
  password,
}: Pick<IUser, 'email' | 'password'>): Promise<{
  user: IUser | null;
  token: string | null;
}> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const token = await jwtProvider.sign({ email }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  const user = {
    email,
    password: hashedPassword,
    tokens: [token],
  };

  users.push(user);

  return { user, token };
};

export const findUser = async (
  properties: Partial<IUser>,
): Promise<IUser | null> => {
  const allowedProperties = ['email'];

  if (!arePropertiesAllowed(Object.keys(properties), allowedProperties)) {
    throw new AllowedPropertiesException(allowedProperties);
  }

  const user = users.find((user) => {
    const everyPropertyMatches = !!Object.entries(properties).every(
      // We can ignore this warning since we check if the property is allowed
      // eslint-disable-next-line security/detect-object-injection
      ([key, value]) => user[key] === value,
    );
    return everyPropertyMatches;
  });

  return user ?? null;
};

export const changeUserByEmail = async (
  email: string,
  properties: Partial<IUser>,
): Promise<IUser | null> => {
  const allowedProperties = ['tokens'];

  if (!arePropertiesAllowed(Object.keys(properties), allowedProperties)) {
    throw new AllowedPropertiesException(allowedProperties);
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new BadRequest('User not found');
  }

  const changedUser = { ...user, ...properties };

  users = users.map((usr) => {
    if (usr.email === email) {
      return changedUser;
    } else {
      return usr;
    }
  });

  return changedUser ?? null;
};
