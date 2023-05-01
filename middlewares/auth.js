const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return new UnauthorizedError('Авторизуйтесь');
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT_KEY);
  } catch (err) {
    return new UnauthorizedError('Авторизуйтесь');
  }
  req.user = payload;
  return next();
};