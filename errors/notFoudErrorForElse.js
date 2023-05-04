const NotFoundError = require('./NotFoundError');

module.exports.notFoudErrorForElse = () => {
  throw new NotFoundError('Таких данных не существует');
};
