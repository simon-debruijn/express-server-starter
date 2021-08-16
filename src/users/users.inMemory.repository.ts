import { IUser } from './IUser';
import * as jwtProvider from '../tokens/jwt.provider';
import bcrypt from 'bcrypt';

const users: IUser[] = [];

export function getUsers() {
  return users;
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

export function findUser(properties: Partial<IUser>): IUser | null {
  const user = users.find((user) =>
    Object.entries(properties).every(([key, value]) => user[key] === value),
  );

  return user ?? null;
}
