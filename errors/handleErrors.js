const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const http2 = require('http2');
const NotFoundError = require('./NotFoundError');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  // HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CONFLICT,
} = http2.constants;

function handleErrors(err, res) {
  if (err.code === 11000) {
    return res.status(HTTP_STATUS_CONFLICT).send({ message: 'Пользователь с такой почтой уже существует' });
  }
  if (err instanceof NotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Данные не найдены' });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректные данные' });
  }
  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
}

module.exports = {
  handleErrors,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  // HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
};
