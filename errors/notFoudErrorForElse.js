const NotFoundError = require('./NotFoundError');

module.exports.notFoudErrorForElse = (req, res, next) => {
  next(new NotFoundError('Таких данных не существует'));
};
