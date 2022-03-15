import { Exception } from './Exception';

export class AllowedPropertiesException extends Exception {
  constructor(properties: string[]) {
    const joinedProperties = properties.join(', ');
    const message = `Only these properties are supported:\n ${joinedProperties}`;
    super(message);
    this.name = 'AllowedPropertiesException';
  }
}
