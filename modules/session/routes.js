const sessionController = require('./controller');

const routes = async (fastify) => {
  fastify.get('/init-session', async (req, reply) => {
    const pool = fastify.mysql;
    sessionController.initSession(pool, req.log).then((response) => {
      reply.send(response);
    }).catch((err) => {
      reply.send(err);
    });
  });

  fastify.post('/close-session', async (req, reply) => {
    const pool = fastify.mysql;
    sessionController.closeSession(pool, req.log, req.body.idSession).then((response) => {
      reply.send(response);
    }).catch((err) => {
      reply.send(err);
    });
  });
};

module.exports = routes;
