const pino = require('pino')({ name: 'myapp', level: 'info', prettyPrint: true });
const fastify = require('fastify')({ logger: pino });

const config = require('./conf');
const { lessOnFly, fullHtml } = require('./utils');
const indexHtml = require('./index.html');
const sessionRoutes = require('./modules/session/routes');
const mysql = require('./modules/database/plugin');

fastify.register(mysql);
fastify.register(sessionRoutes, { prefix: '/session' });

fastify.get('/index.html', (request, reply) => {
  fullHtml(reply, indexHtml, config.indexHtml);
});

fastify.get('/css/styles.css', (req, reply) => {
  lessOnFly(reply);
});

fastify.listen(config.port, (err) => {
  if (err) {
    pino.fatal(err);
    throw err;
  }
  pino.info(`server listening on ${fastify.server.address().port}`);
});
