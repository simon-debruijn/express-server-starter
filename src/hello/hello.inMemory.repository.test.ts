import { getForbidden, getHello } from './hello.inMemory.repository';

describe('hello.inMemory.repository', () => {
  test("getHello returns { hello: 'world' }", () => {
    const result = getHello();
    expect(result).toEqual({ hello: 'world' });
  });

  test("getForbidden returns 'You were granted access'", () => {
    const result = getForbidden();
    expect(result).toEqual('You were granted access');
  });
});
