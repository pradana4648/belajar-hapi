/*
 * Error Route
 *
 * This route will handle any request if resource on the server is not found
 *
 */

/**
 * @type{import('@hapi/hapi').ServerRoute}
 */
export default {
  method: ['*'],
  path: '/{any*}',
  handler: (req, h) => {
    return h.view('404').code(200);
  },
};
