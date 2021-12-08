import { IUser } from './IUser';
import * as jwtProvider from '../jwts/jwt.provider';
import bcrypt from 'bcrypt';
import { MutationNotAllowedException } from '../exceptions/MutationNotAllowedException';
import { BadRequest } from 'ts-httpexceptions';

let users: IUser[] = [];

export function clearAllUsers() {
  users = [];
}

export async function addUser({
  email,
  password,
}: Pick<IUser, 'email' | 'password'>): Promise<{
  user: IUser | null;
  token: string | null;
}> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const token = await jwtProvider.sign(
    { email },
    process.env.JWT_SECRET ?? '',
    {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  );

  const user = {
    email,
    password: hashedPassword,
    tokens: [token],
  };

  users.push(user);

  return { user, token };
}

export async function findUser(
  properties: Partial<IUser>,
): Promise<IUser | null> {
  const user = users.find((user) =>
    Object.entries(properties).every(([key, value]) => user[key] === value),
  );

  return user ?? null;
}

export async function changeUserByEmail(
  email: string,
  properties: Partial<IUser>,
): Promise<IUser | null> {
  const allowedProperties = new Set(['tokens']);

  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    throw new BadRequest('User not found');
  }

  const notAllowed = Object.keys(properties).some(
    (property) => !allowedProperties.has(property),
  );

  if (notAllowed) {
    throw new MutationNotAllowedException(
      `Mutation is only allowed on the following properties: ${[
        ...allowedProperties.keys(),
      ].join(', ')}`,
    );
  }

  const changedUser = { ...users[userIndex], ...properties };

  users[userIndex] = changedUser;

  return changedUser ?? null;
}
