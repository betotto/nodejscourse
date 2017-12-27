const fp = require('fastify-plugin');
const mysql = require('mysql');
const config = require('../../conf');
const pool  = mysql.createPool(config.mysqlParams);

const mysqlPool = async (fastify) => {
  fastify.decorate('mysql', pool);
};

module.exports = fp(mysqlPool);
