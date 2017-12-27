const sessionController = require('./controller');

const routes = async (fastify) => {
  fastify.get('/init-session', async (req, reply) => {
    sessionController.initSession(fastify.mysql).then((response) => {
      reply.send(response);
    }).catch((err) => {
      reply.send(err);
    });
  });

  fastify.post('/close-session', async (req, reply) => {
    sessionController.closeSession(fastify.mysql, req.body.idSession).then((response) => {
      reply.send(response);
    }).catch((err) => {
      reply.send(err);
    });
  });
};

module.exports = routes;
