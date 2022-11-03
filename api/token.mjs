import hapiAuthJwt from '@hapi/jwt';

/** @type{import('@hapi/hapi').ServerRoute[]} */
const tokenRoute = [
  {
    method: 'GET',
    path: '/token',
    options: { auth: false },
    handler: (req, h) => {
      const token = hapiAuthJwt.token.generate(
        {
          aud: 'belajar_hapi',
          iss: 'belajar_iss',
        },
        {
          key: 'test123',
          algorithm: 'HS512',
        }
      );
      return h.response({
        result: token,
      });
    },
  },
  {
    method: 'POST',
    path: '/verifyToken',
    handler: (req, h) => {
      const verifyToken = (artifacts, secret, opts = {}) => {
        try {
          hapiAuthJwt.token.verify(artifacts, secret, opts);
          return { isValid: true };
        } catch (error) {
          return {
            isValid: false,
            error: error.message,
          };
        }
      };
      const authorizationHeaders = req.headers.authorization;
      const authTokenHeader = authorizationHeaders.split(' ')[1];
      const decodedToken = hapiAuthJwt.token.decode(authTokenHeader);
      const validResponse = verifyToken(decodedToken, 'test123');
      return h.response({
        validResponse,
      });
    },
  },
];

export default tokenRoute;
