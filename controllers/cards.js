const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.createCard = (req, res) => {
  const owner = (req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.send({ error: 'Такой карточки нет' });
      }
      res.send(card);
      return;
    })
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
