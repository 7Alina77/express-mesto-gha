const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Error DB connection');
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '643edb1df30158bde6113f6c',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routesUsers);
app.use('/', routesCards);
/** app.use('*', (req, res) => {
  res.status.send({});
}); */

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
