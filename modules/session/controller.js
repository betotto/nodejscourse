const querys = require('../database/querys.json');

const sessionStatus = {
  OPEN: 1,
  CLOSED: 2
};

const initSession = (pool) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        reject(err);
      }
      const session = {
        status: sessionStatus.OPEN
      };
      const query = connection.query(querys.session.init, [session.status], (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        session.id = results.insertId;
        resolve(session);
      });
      global.pino.info(query.sql);
    });
  });
};

const closeSession = (pool, idSession) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        reject(err);
      }
      const query = connection.query(querys.session.close, [sessionStatus.CLOSED, idSession], (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        resolve(results);
      });
      global.pino.info(query.sql);
    });
  });
};

module.exports = {
  initSession,
  closeSession
};
