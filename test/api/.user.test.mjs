import { expect } from '@hapi/code';
import { init } from '../../server.mjs';

describe('User Route', () => {
  /** @type{import('@hapi/hapi').Server} */
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    server.stop();
  });

  describe('POST /login', () => {
    it('should return valid payload if existed', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'admin@test.com',
          password: 'admin1234',
        },
        headers: {
          'content-type': 'application/json',
        },
      });
      expect(response.payload).to.be.exist();
    });

    it('should return content-type is application/json;charset=utf8', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'admin@test.com',
          password: 'admin1234',
        },
        headers: {
          'content-type': 'application/json;charset=utf8',
        },
      });
      expect(response.headers['content-type']).to.be.equal(
        'application/json;charset=utf8'
      );
    });

    it('should return status code with 200', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'admin@test.com',
          password: 'admin1234',
        },
      });
      expect(response.statusCode).to.be.equal(200);
    });

    it('should return valid jwt', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'admin@test.com',
          password: 'admin1234',
        },
      });
      console.log(server.auth.settings);
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe('POST /register', () => {});
});
