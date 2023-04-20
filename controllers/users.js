const User = require('../models/user');
const handleErrors = require('../errors/handleErrors');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(err => handleErrors(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
      return;
    })
    .catch(err => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => handleErrors(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({
        _id: user._id,
        avatar: user.avatar,
        name,
        about,
      });
      return;
    })
    .catch(err => handleErrors(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({
        _id: user._id,
        avatar,
        name: user.name,
        about: user.about,
      });
    })
    .catch(err => handleErrors(err, res));
};