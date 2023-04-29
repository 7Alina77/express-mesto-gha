const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../controllers/users');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { token } = req.cookies;
  if (!token || !authorization.startsWith('Bearer')) {
    return new UnauthorizedError();
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT_KEY);
  } catch (err) {
    return new UnauthorizedError();
  }
  req.user = payload;
  return next();
};
