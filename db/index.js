const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/bookings';

const db = mongoose.connect(mongoUri);

module.exports = db;