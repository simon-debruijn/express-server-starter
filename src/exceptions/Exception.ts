export class Exception extends Error {
  name: string;
  message: string;

  constructor(message: string) {
    super();
    this.name = 'Exception';
    this.message = message;
  }
}
