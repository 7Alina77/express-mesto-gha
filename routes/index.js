const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
// const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { HTTP_STATUS_NOT_FOUND } = require('../errors/handleErrors');

router.post('/signin', login);
router.post('/signup', createUser);

// router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);

router.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Ошибка URL' });
});

module.exports = router;
