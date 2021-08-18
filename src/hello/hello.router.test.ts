import request from 'supertest';
import { app } from '../app';

describe('hello.router', () => {
  test("getHello returns { hello: 'world' }", async () => {
    const response = await request(app).get('/hello');
    expect(response.body).toEqual({ hello: 'world' });
  });

  test('getForbidden returns exception when not authorized', async () => {
    const response = await request(app).get('/hello/forbidden');
    expect(response.body).toEqual({
      message: 'Was unable to authenticate',
      name: 'UNAUTHORIZED',
      status: 401,
      type: 'HTTP_EXCEPTION',
    });
  });

  test("getForbidden returns 'You were granted access' when authorized", async () => {
    const email = 'test@test.be';
    const password = 'HJGDYGYjhkjh';

    const responseRegister = await request(app)
      .post('/users/register')
      .set('Content-Type', 'application/json')
      .send({ email, password });

    expect(responseRegister.body.token).toBeDefined();

    const responseForbidden = await request(app)
      .get('/hello/forbidden')
      .set('Authorization', `Bearer ${responseRegister.body.token}`);

    expect(responseForbidden.text).toEqual('You were granted access');
  });
});
