const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleErrors } = require('../errors/handleErrors');
const NotFoundError = require('../errors/NotFoundError');

const SECRET_JWT_KEY = 'b05ac39769e78e4ce23d22b27149508674327458d46957834b0f7dc9a9c7a105';

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

module.exports.getMe = (req, res) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        return res.send(user);
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(200).send(user))
      .catch((err) => handleErrors(err, res)));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        return res.send({
          _id: user._id,
          avatar: user.avatar,
          name,
          about,
        });
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        return res.send({
          _id: user._id,
          avatar,
          name: user.name,
          about: user.about,
        });
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, SECRET_JWT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
