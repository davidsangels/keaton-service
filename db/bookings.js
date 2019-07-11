const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const bookingSchema = new mongoose.Schema({
  price: Number,
  serviceFee: Number,
  reviewScore: Number,
  reviewAmount: Number,
  maxGuests: Number,
  maxAdults: Number,
  maxChildren: Number,
  maxInfants: Number,
  minBooking: Number,
  maxBooking: Number,
  reservations: String
},
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Blog', bookingSchema);

module.exports = Booking;
