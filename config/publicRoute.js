/*
 * Public Route and Static Files
 *
 * This route will be used for managing public route and static files
 * based on any request that user made in browser
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
    options: {
      auth: false,
      description: 'Halaman awal',
    },
    handler: {
      view: {
        template: 'index',
      },
    },
  },
  {
    method: ['GET'],
    path: '/css/main.css',
    options: {
      auth: false,
    },
    handler: (req, h) => {
      return h.file('css/main.css').code(200);
    },
  },
];
