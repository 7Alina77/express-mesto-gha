const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { HTTP_STATUS_NOT_FOUND } = require('./errors/handleErrors');
const login = require('./routes/users');
const createUser = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Ошибка URL' });
});

app.listen(PORT);
