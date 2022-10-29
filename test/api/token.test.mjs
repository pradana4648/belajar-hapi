import { init } from '../../server.mjs';

describe('Token Route', () => {
  /** @type{import('@hapi/hapi').Server} */
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    server.stop();
  });

  describe('POST /token', () => {
    it('should return generated route', () => {
      server.auth.strategy('jwt_token', 'jwt', {
        keys: {
          key: 'test123',
          algorithms: ['HS256', 'HS512'],
          kid: 'test123',
        },
      });
      server.auth.default('jwt_token');
    });
  });
});
