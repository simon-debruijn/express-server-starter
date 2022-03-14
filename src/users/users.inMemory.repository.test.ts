import { BadRequest } from 'ts-httpexceptions';
import { MutationNotAllowedException } from '../exceptions/MutationNotAllowedException';
import * as usersRepository from './users.inMemory.repository';
import * as mockedConstants from '../constants';

jest.mock('../constants', () => {
  return {
    JWT_SECRET: 'shhhhh',
  };
});

describe('users.inMemory.repository', () => {
  const validEmail = 'test@test.com';
  const validPassword = 'gjhfjghfygz';

  beforeEach(() => {
    jest.clearAllMocks();

    usersRepository.clearAllUsers();
  });

  test('addUser should push the new user into users and return { user: { email, tokens }, token }', async () => {
    const result = await usersRepository.addUser({
      email: validEmail,
      password: validPassword,
    });

    const isFound = !!(await usersRepository.findUser({ email: validEmail }));

    expect(typeof result.token).toEqual('string');
    expect(result.user?.email).toEqual(validEmail);
    expect(result.user?.tokens).toEqual([result.token]);
    expect(typeof result.user?.password).toEqual('string');
    expect(result.user?.password).not.toEqual(validPassword);

    expect(isFound).toBeTruthy();
  });

  test('findUser should find a user and return it', async () => {
    await usersRepository.addUser({
      email: validEmail,
      password: validPassword,
    });

    const user = await usersRepository.findUser({ email: validEmail });

    expect(user?.email).toEqual(validEmail);
    expect(typeof user?.password).toEqual('string');
    expect(user?.tokens.length).toBeGreaterThanOrEqual(1);
  });

  test("changeUserByEmail should throw BadRequest exception if user doesn't exist", async () => {
    try {
      await usersRepository.changeUserByEmail(validEmail, { tokens: [] });
    } catch (err: any) {
      expect(err).toBeInstanceOf(BadRequest);
      expect(err.message).toEqual('User not found');
    }
  });

  test('changeUserByEmail should throw MutationNotAllowedException if the provided property is not allowed', async () => {
    try {
      await usersRepository.addUser({
        email: validEmail,
        password: validPassword,
      });

      await usersRepository.changeUserByEmail(validEmail, {
        password: 'gotcha',
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(MutationNotAllowedException);
      expect(err.message).toEqual(
        `Mutation is only allowed on the following properties: tokens`,
      );
    }
  });

  test('changeUserByEmail should change the user in users and return the changed user', async () => {
    const { user: userBeforeChange } = await usersRepository.addUser({
      email: validEmail,
      password: validPassword,
    });

    const userAfterChange = await usersRepository.changeUserByEmail(
      validEmail,
      {
        tokens: [],
      },
    );

    expect(userBeforeChange?.tokens.length).toBeGreaterThanOrEqual(1);
    expect(userAfterChange?.tokens.length).toEqual(0);

    const foundUser = await usersRepository.findUser({ email: validEmail });

    expect(foundUser?.tokens.length).toEqual(0);
  });
});
