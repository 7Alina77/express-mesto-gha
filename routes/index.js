const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { handleErrors } = require('../errors/handleErrors');
const { validateLogin, validateSignUp } = require('../validators/userValidator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);

router.use('*', (err, req, res, next) => {
  const newNotFoundError = new NotFoundError('Нет данных');
  handleErrors(newNotFoundError, req, res, next);
});

module.exports = router;
