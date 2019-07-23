const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const morgan = require('morgan');
const path = require('path');
const Bookings = require('../db/bookings.js');

// app.use('/:idPlace', express.static(path.resolve(__dirname, '..', 'public')));
app.use('/:idPlace', expressStaticGzip(path.resolve(__dirname, '..', 'public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
     res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));
app.use(morgan('dev'));


app.get('/bookings/:idPlace', (req, res) => {
  console.log(req.params.idPlace)
  Bookings.find((err, docs) => res.send(docs[req.params.idPlace]));
});

app.listen(3001, () => {
});
