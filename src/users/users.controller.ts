import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions/ValidationException';
import { User } from './User';
import * as usersRepository from './users.inMemory.repository';
import { BadRequest } from 'ts-httpexceptions';
import bcrypt from 'bcrypt';
import * as jwtProvider from '../jwts/jwt.provider';
import { Exception } from '../exceptions/Exception';
import { JWT_SECRET } from '../constants';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = new User(req.body);

    const validationErrors = await validate(user);

    if (validationErrors.length > 0) {
      throw new ValidationException('User data is not valid', validationErrors);
    }

    const alreadyExists = !!(await usersRepository.findUser({
      email: user.email,
    }));

    if (alreadyExists) {
      throw new Exception('User already exists');
    }

    const { token, user: userWithTokens } = await usersRepository.addUser(user);

    const { password, ...userWithoutPassword } = userWithTokens ?? {};

    res.send({ user: userWithoutPassword, token });
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest('Was unable to login');
    }

    const user = await usersRepository.findUser({ email });

    const isPasswordMatch =
      user?.password && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordMatch) {
      throw new BadRequest('Was unable to login');
    }

    const token = await jwtProvider.sign({ email }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    await usersRepository.changeUserByEmail(user.email, {
      tokens: [...user.tokens, token],
    });

    res.send({ token });
  } catch (err: any) {
    next(err);
  }
};

export const changeUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const properties = req.body;
    const { password, ...userWithoutPassword } =
      (await usersRepository.changeUserByEmail(email, properties)) ?? {};
    res.send(userWithoutPassword);
  } catch (err: any) {
    next(err);
  }
};
