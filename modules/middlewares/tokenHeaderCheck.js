const tokenHeaderCheck = (req, reply, next) => {
  next();
};

module.exports = tokenHeaderCheck;
