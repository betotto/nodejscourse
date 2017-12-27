const messageController = require('./controller');
const NewMessage = require('./NewMessage');

const routes = async (fastify) => {

  fastify.post('/send', async (req, reply) => {
    messageController.saveMessage(fastify.mysql, 2, 1, req.body.message)
      .then((messageResponse) => {
        NewMessage.emit('newMessage', req.body.message);
        reply.send(messageResponse);
      }).catch((error) => {
        reply.send(error);
      });
  });

  fastify.get('/events', async (req, reply) => {
    //const pool = fastify.mysql;
    const newMessageHandler = (message) => {
      req.log.info('newMessage');
      reply.send(message);
      NewMessage.removeListener('newMessage', newMessageHandler);
    };
    NewMessage.on('newMessage', newMessageHandler);
  });
};

module.exports = routes;
