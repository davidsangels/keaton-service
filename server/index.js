const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('whats up');
})

app.listen(3000, () => {
  console.log('server listening on 3000');
})