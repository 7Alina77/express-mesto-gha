const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const NotFoundError = require('./NotFoundError');

const handleErrors = (err, res) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: 'Данные не найдены' });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(400).send({ message: 'Некорректные данные' });
  }
  return res.status(500).send({ message: 'Ошибка сервера' });
};

module.exports = handleErrors;