const querys = require('../database/querys.json');

const sessionStatus = {
  OPEN: 1,
  CLOSED: 2
};

const initSession = (pool, log) => {
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
        session.id = results.insertId;
        if (error) {
          reject(error);
        }
        resolve(session);
      });
      log.info(query.sql);
    });
  });
};

const closeSession = (pool, log, idSession) => {
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
      log.info(query.sql);
    });
  });
};

module.exports = {
  initSession,
  closeSession
};
