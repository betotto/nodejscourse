const pino = require('pino')({ name: 'myapp', level: 'info', prettyPrint: true });
const fastify = require('fastify')({ logger: pino });

const config = require('./conf');

const App = require('./modules');

App(fastify);

global.pino = pino;

fastify.listen(config.port, (err) => {
  if (err) {
    pino.fatal(err);
    throw err;
  }
  global.pino.info(`server listening on ${fastify.server.address().port}`);
});
