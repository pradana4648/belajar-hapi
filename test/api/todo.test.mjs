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

  it('response with 200 OK', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/todos',
    });
    expect(res.statusCode).to.equal(200);
  });

  it('response should contain message with value /todos', async function () {
    const response = await server.inject({
      method: 'GET',
      url: '/todos',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(response.headers['content-type']).to.equal(
      'application/json;charset=utf8'
    );
    expect(response.result).to.equal({ message: '/todos' });
  });
});
