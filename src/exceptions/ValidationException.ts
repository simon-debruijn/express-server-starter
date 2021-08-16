import { ValidationError } from 'class-validator';
import { Exception } from './Exception';

export class ValidationException extends Exception {
  errors?: ValidationError[];

  constructor(message: string, errors?: ValidationError[]) {
    super(message);
    this.name = 'ValidationException';
    this.errors = errors;
  }
}
