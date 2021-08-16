import { Exception } from './Exception';

export class AllowedMutationException extends Exception {
  constructor(message: string) {
    super(message);
    this.name = 'AllowedMutationException';
  }
}
