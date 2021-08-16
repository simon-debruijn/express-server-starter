interface IException extends Error {}

export class Exception implements IException {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.name = 'Exception';
    this.message = message;
  }
}
