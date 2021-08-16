import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions/ValidationException';
import { User } from './User';
import * as usersRespository from './users.inMemory.repository';
import { BadRequest } from 'ts-httpexceptions';
import bcrypt from 'bcrypt';

export function getUsers(req: Request, res: Response, next: NextFunction) {
  const users = usersRespository.getUsers();

  res.send({ users });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = new User(req.body);

    const validationErrors = await validate(user);

    if (validationErrors.length > 0) {
      throw new ValidationException('User data is not valid', validationErrors);
    }

    const { token, user: userWithTokens } = await usersRespository.addUser({
      email: user.email,
      password: user.password,
    });

    const { password, ...userWithoutPassword } = userWithTokens ?? {};

    res.send({ user: userWithoutPassword, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest('Was unable to login');
    }

    const user = usersRespository.findUser({ email });

    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password ?? '',
    );

    if (!user || !isPasswordMatch) {
      throw new BadRequest('Was unable to login');
    }

    const lastToken = user.tokens[user.tokens.length - 1];

    res.send({ token: lastToken });
  } catch (err) {
    next(err);
  }
}
