const express = require('express');

const app = express();
const morgan = require('morgan');
const path = require('path');
const Bookings = require('../db/bookings.js');

app.use('/:idPlace', express.static(path.resolve(__dirname, '..', 'public')));
app.use(morgan('dev'));


app.get('/bookings/:idPlace', (req, res) => {
  console.log(req.params.idPlace)
  Bookings.find((err, docs) => res.send(docs[req.params.idPlace]));
});

app.listen(3001, () => {
});
