export interface IUser {
  [key: string]: unknown;

  email: string;
  password: string;
  tokens: string[];
}
