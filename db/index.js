const mongoose = require('mongoose');
const mongoUri = 'mongodb://172.17.0.3/bookings';

const db = mongoose.connect(mongoUri);

module.exports = db;