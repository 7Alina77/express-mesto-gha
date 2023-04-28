const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.get('/me', getMe);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
