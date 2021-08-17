export class Exception implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string) {
    this.name = 'Exception';
    this.message = message;
  }
}
