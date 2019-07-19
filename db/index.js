const mongoose = require('mongoose');
const mongoUri = 'mongodb://database/bookings';

const db = mongoose.connect(mongoUri);

module.exports = db;