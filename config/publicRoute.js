/*
 * Public Route and Static Files
 *
 * This route will be used for managing public route and static files
 * based on any request that user made in browser
 *
 *
 *
 */

// TODO: Should added custom config
/**
 * @type{import('@hapi/hapi').ServerRoute[]}
 */
export default [
  {
    method: ['GET'],
    path: '/',
    handler: (req, h) => {
      return h.view('index').code(200);
    },
  },
  {
    method: ['GET'],
    path: '/css/main.css',
    handler: (req, h) => {
      return h.file('css/main.css').code(200);
    },
  },
  {
    method: ['GET'],
    path: '/about',
    handler: (req, h) => {
      return h.view('about').code(200);
    },
  },
];
