const router = require('express').Router();
const notFoundErrorForElse = require('../errors/notFoudErrorForElse');

router.all('/*', notFoundErrorForElse);

module.exports = router;
