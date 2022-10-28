const Hapi = require('@hapi/hapi');
const Path = require('path');

(async function () {
  const HOST =
    process.env.NODE_ENV == 'development'
      ? 'localhost'
      : 'belajar-hapi-production.up.railway.app';
  const PORT = process.env.NODE_ENV == 'development' ? 8000 : 3000;

  const server = Hapi.server({
    debug:
      process.env.NODE_ENV == 'development'
        ? {
            log: ['*'],
            request: ['*'],
          }
        : undefined,
    port: PORT,
    host: HOST,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
    },
  });

  await server.register(require('@hapi/vision'));
  await server.register(require('@hapi/inert'));

  /*
   * Views
   *
   * Register Views
   */
  server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: 'public',
  });

  /**
   *  Routes
   *
   *  Public Route
   */
  server.route([
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
    {
      method: ['*'],
      path: '/{any*}',
      handler: (req, h) => {
        return h.view('404').code(200);
      },
    },
  ]);

  await server.start();
  console.log('Server running at:', server.info.uri);
})();
