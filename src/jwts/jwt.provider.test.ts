import { JsonWebTokenError } from 'jsonwebtoken';
import * as jwtprovider from './jwt.provider';

describe('jwt.provider', () => {
  const correctPayload = { email: 'test@test.com' };
  const secret = 'shhhhhh';
  const wrongSecret = 'hssssss';

  test('sign should return a token when the correct data is passed as payload', async () => {
    const token = await jwtprovider.sign(correctPayload, secret, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
  });

  test('verify should verify and return email when the correct token and the correct secret are passed', async () => {
    const token = await jwtprovider.sign(correctPayload, secret, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    const { exp, iat, ...decoded } = await jwtprovider.verify(token, secret, {
      algorithms: ['HS256'],
    });

    expect(decoded).toEqual(correctPayload);
  });

  test('verify should throw an error when the wrong secret is passed', async () => {
    const token = await jwtprovider.sign(correctPayload, secret, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    try {
      await jwtprovider.verify(token, wrongSecret, {
        algorithms: ['HS256'],
      });
    } catch (err: any) {
      expect(err).toBeInstanceOf(JsonWebTokenError);
    }
  });
});
