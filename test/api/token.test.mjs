import { expect } from '@hapi/code';
import hapiAuthJwt from '@hapi/jwt';
import { init } from '../../server.mjs';

describe('Token API', () => {
  /** @type{import('@hapi/hapi').Server}) */
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  describe('GET /token', () => {
    it('should return same payload for JWT', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/token',
        auth: {
          strategy: 'my-jwt',
          credentials: {},
        },
      });
      const decodedToken = hapiAuthJwt.token.decode(response.result.result);
      expect(decodedToken.decoded.payload).to.be.equal({
        iss: 'belajar_iss',
        aud: 'belajar_hapi',
        iat: Math.floor(Date.now() / 1000),
      });
    });
  });

  describe('POST /verifyToken', () => {
    it('should return response isValid is true if JWT is valid', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/verifyToken',
        auth: {
          strategy: 'my-jwt',
          credentials: {},
        },
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJiZWxhamFyX2hhcGkiLCJpc3MiOiJiZWxhamFyX2lzcyIsImlhdCI6MTY2NzQzNjc0NX0.pR32uMXk-QHHtOW37A7oW1uVWJmUcgSkROGRyTkPqjAQok7SWkjRuY-E_UXUlIdc1NAP6a3SqEDCdBBxHySh_g',
        },
      });
      expect(response.result.validResponse).to.be.equal({
        isValid: true,
      });
    });
  });
});
