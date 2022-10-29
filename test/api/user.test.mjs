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

  /// FIX: Need to be fixed, the current result still 404 HTML and not JSON
  // describe('POST /login', () => {
  //   it('should return valid payload', async () => {
  //     const response = await server.inject({
  //       method: 'POST',
  //       url: '/login',
  //       payload: {
  //         email: 'admin@test.com',
  //         password: 'admin1234',
  //       },
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });
  //     expect(JSON.parse(response.rawPayload.toJSON())).to.be.equal({
  //       email: 'admin@test.com',
  //       password: 'admin1234',
  //     });
  //   });

    /// FIX: Need to be fixed, the current result still 404 HTML and not JSON
    // it('should return content-type is application/json', async () => {
    //   const response = await server.inject({
    //     method: 'POST',
    //     url: '/login',
    //     payload: {
    //       email: 'admin@test.com',
    //       password: 'admin1234',
    //     },
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   });
    //   console.log(response.result);
    //   expect(response.headers['content-type']).to.be.equal('application/json');
    // });

    it('should retun statuscode 200 when success', async () => {
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
  });

  describe('POST /register', () => {});
});
