import Hapi from '@hapi/hapi';
import Handlebars from 'handlebars';
import JWT from '@hapi/jwt';
import Path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import corePlugin from './plugin/core/index.mjs';
import publicRoute from './config/publicRoute.js';
import unknownRoute from './config/unknownRoute.js';
import tokenRoute from './api/token.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.NODE_ENV == 'development' ? 8000 : process.env.PORT;

const server = Hapi.server({
  debug:
    process.env.NODE_ENV == 'development'
      ? {
          log: ['*'],
          request: ['*'],
        }
      : undefined,
  port: PORT,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public'),
    },
  },
});

/********************
 * Register Plugins *
 ********************/

await server.register(corePlugin);
await server.register(JWT);

/*****************************
 * Authentication Strategies *
 *****************************/
server.auth.strategy('my-jwt', 'jwt', {
  keys: 'test123',
  verify: {
    aud: 'belajar_hapi',
    iss: 'belajar_iss',
    sub: false,
  },
  validate: async (artifacts, req, h) => {
    console.dir(artifacts, req);
    console.log(h);
    return {
      isValid: true,
      credentials: {
        user: artifacts.decoded.payload.user,
      },
    };
  },
});

server.auth.default('my-jwt');

/*
 * Views
 *
 * Register Views
 */
server.views({
  engines: { html: Handlebars },
  relativeTo: __dirname,
  path: 'public',
});

/**********
 * Routes *
 **********
 *
 * List all available routes for server
 *
 */

/*****************
 *  Public Route *
 *****************/
server.route(publicRoute);

/**************
 * Todo Route *
 **************/
// server.route(todoRoute);

/**************
 * User route *
 **************/
// server.route(userRoute);

/*****************
 * Unknown Route *
 *****************/
server.route(unknownRoute);

server.route(tokenRoute);

/** @type{import('@hapi/hapi').Server} */
export const start = async () => {
  await server.start();
  console.log('Server running on:', server.info.uri);
  return server;
};

/** @type{import('@hapi/hapi').Server} */
export const init = async () => {
  await server.initialize();
  return server;
};
