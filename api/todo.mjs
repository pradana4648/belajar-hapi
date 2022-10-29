/**
 * @type{import('@hapi/hapi').ServerRoute[]}
 */
const todoRoute = [
  {
    method: ['GET'],
    path: '/todos',
    handler: (req, h) => {
      return h
        .response({
          message: req.route.path,
        })
        .type('application/json;charset=utf8')
        .encoding('utf8')
        .code(200);
    },
  },
];

export default todoRoute;
