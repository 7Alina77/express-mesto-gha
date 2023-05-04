const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUser, validateUserAvatar } = require('../validators/userValidator');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', validateUser, updateUser);
router.get('/me', getMe);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
