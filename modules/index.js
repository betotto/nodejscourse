const sessionRoutes = require('./session/routes');
const messagesRoutes = require('./messages/routes');
const mysql = require('./plugins/database');
const { lessOnFly, fullHtml, webpackCompiler } = require('./utils');
const config = require('../conf');
const Views = require('../views');
const tokenHeaderCheck = require('./middlewares/tokenHeaderCheck');

const configApp = (fastify) => {

  fastify.use(['/session', '/messages'], tokenHeaderCheck);

  fastify.register(mysql);

  fastify.register(sessionRoutes, { prefix: '/session' });
  fastify.register(messagesRoutes, { prefix: '/messages' });

  fastify.get('/index.html', (request, reply) => {
    fullHtml(reply, Views.Base, config.indexHtml, [Views.HomePage]);
  });

  fastify.get('/chat.html', (request, reply) => {
    fullHtml(reply, Views.Base, config.indexHtml, [Views.ChatPage]);
  });

  fastify.get('/session.html', (request, reply) => {
    fullHtml(reply, Views.Base, config.indexHtml, [Views.SessionPage]);
  });

  fastify.get('/css/styles.css', (req, reply) => {
    lessOnFly(reply);
  });

  fastify.get('/js/app.js', (req, reply) => {
    webpackCompiler(reply, 'app.js', 'app.js');
  });
};

module.exports = configApp;
