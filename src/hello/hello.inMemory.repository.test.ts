import { getForbidden, getHello } from './hello.inMemory.repository';

describe('hello.inMemory.repository', () => {
  test("getHello should return { hello: 'world' }", () => {
    const result = getHello();
    expect(result).toEqual({ hello: 'world' });
  });

  test("getForbidden should return 'You were granted access'", () => {
    const result = getForbidden();
    expect(result).toEqual('You were granted access');
  });
});
