import {
  IsDefined,
  IsEmail,
  IsString,
  MinLength,
  NotContains,
} from 'class-validator';
import { IUser } from './IUser';

export class User implements IUser {
  [key: string]: unknown;

  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(6)
  @NotContains('password')
  @NotContains('1234')
  password: string;

  tokens: string[] = [];

  constructor({ email, password }: User) {
    this.email = email;
    this.password = password;
  }

  toObject(): IUser {
    return { email: this.email, password: this.password, tokens: this.tokens };
  }
}
