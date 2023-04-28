const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../controllers/users');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { token } = req.cookies || authorization.replace('Bearer', '');
  if (!token || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Необходимо авторизоваться' });
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT_KEY);
  } catch (err) {
    return res.status(401).send({ message: 'Необходимо авторизоваться' });
  }
  req.user = payload;
  return next();
};
