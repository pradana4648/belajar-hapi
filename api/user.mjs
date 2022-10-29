import Joi from 'joi';

/**
 * @type{import('@hapi/hapi').ServerRoute[]}
 */
const userRoute = [
  {
    method: 'POST',
    path: '/register',
    handler: (req, h) => {
      return h
        .response({
          message: req.route.path,
        })
        .code(200);
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: (req, h) => {
      return h
        .response({
          message: req.route.path,
        })
        .type('application/json')
        .code(200);
    },
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(4).required(),
        }),
      },
    },
  },
];

export default userRoute;
