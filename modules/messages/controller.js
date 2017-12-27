const querys = require('../database/querys.json');

const saveMessage = (pool, idSession, idUser, content) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        reject(err);
      }
      const message = {
        idSession,
        idUser,
        content
      };
      const query = connection.query(querys.messages.save,
        [message.idSession, message.idUser, message.content],
        (error, results) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            message.id = results.insertId;
            resolve(results);
          }
        });
      global.pino.info(query.sql);
    });
  });
};

module.exports = {
  saveMessage,
};
