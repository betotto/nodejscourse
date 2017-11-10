const pino = require('pino')({ name: 'myapp', level: 'debug', prettyPrint: true });
const config = require('./conf');
const fastify = require('fastify')({ logger: pino });
const { lessOnFly, fullHtml } = require('./utils');
const indexHtml = require('./index.html');

fastify.get('/index.html', function (request, reply) {
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
