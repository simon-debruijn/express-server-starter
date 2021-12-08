import { Exception } from './Exception';

export class MutationNotAllowedException extends Exception {
  constructor(message: string) {
    super(message);
    this.name = 'MutationNotAllowedException';
  }
}
