import Hapi from '@hapi/hapi';
import Handlebars from 'handlebars';
import Path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import corePlugin from './plugin/core/index.mjs';
import publicRoute from './config/publicRoute.js';
import unknownRoute from './config/unknownRoute.js';
import todoRoute from './api/todo.mjs';
import userRoute from './api/user.mjs';

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

await server.register(corePlugin);

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

/**
 **********
 * Routes *
 **********
 *
 * List all available routes for server
 */

/*****************
 *  Public Route *
 *****************/
server.route(publicRoute);

/**************
 * Todo Route *
 **************/
server.route(todoRoute);

/**************
 * User route *
 **************/
server.route(userRoute);

/*****************
 * Unknown Route *
 *****************/
server.route(unknownRoute);

await server.initialize();

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
