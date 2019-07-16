const express = require('express');

const app = express();
const morgan = require('morgan');
const path = require('path');
const Bookings = require('../db/bookings.js');

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('whats up');
});

app.get('/bookings', (req, res) => {
  Bookings.find((err, docs) => res.send(docs[0]));
});

app.listen(3001, () => {
});
