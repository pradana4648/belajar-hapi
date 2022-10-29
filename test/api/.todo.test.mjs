import { expect } from '@hapi/code';
import { init } from '../../server.mjs';

describe('Todos Route', () => {
  /** @type{import('@hapi/hapi').Server} */
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    server.stop();
  });

  describe('GET /todos', () => {
    it('should return status code with 200', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/todos',
        headers: {
          'content-type': 'application/json;charset=utf8',
        },
      });
      expect(res.statusCode).to.equal(200);
    });

    it('should contain message with value /todos', async function () {
      const response = await server.inject({
        method: 'GET',
        url: '/todos',
        headers: {
          'content-type': 'application/json;charset=utf8',
        },
      });
      expect(response.result).to.equal({ message: '/todos' });
    });

    it('should return content-type is application/json;charset=utf8', async function () {
      const response = await server.inject({
        method: 'GET',
        url: '/todos',
        headers: {
          'content-type': 'application/json;charset=utf8',
        },
      });
      expect(response.headers['content-type']).to.equal(
        'application/json;charset=utf8'
      );
    });

    // it('should return content-type is application/json', async function () {
    //   const response = await server.inject({
    //     method: 'GET',
    //     url: '/todos',
    //     headers: {
    //       'content-type': 'application/json;charset=utf8',
    //     },
    //   });
    //   expect(response.payload).to.equal('application/json;charset=utf8');
    // });
  });
});
