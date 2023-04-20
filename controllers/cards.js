const Card = require('../models/card');
const handleErrors = require('../errors/handleErrors');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(err => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const owner = (req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send({ data: card });
      return;
    })
    .catch(err => handleErrors(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send({ data: card });
      return;
    })
    .catch(err => handleErrors(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      res.send({ data: card });
      return;
    })
    .catch(err => handleErrors(err, res));
};
