const db  = require('./index.js');
const Booking = require('./bookings.js');
const faker = require('faker');
const dateFns = require('date-fns');
const mongoose = require('mongoose');

const dateFormat = 'dddd YYYY MMMM';
const date = faker.date.between('2019-07-11', '2019-07-11');
const date2 = new Date();

const date3 = dateFns.addDays(date, 1);

const dates = [];
while (dates.length < 80) {
  let bookDate = faker.date.between('2019-08-01', '2020-12-15');
  dates.push(bookDate)
  let stayCounter = Math.floor(Math.random()*8)
  while (stayCounter > 0) {
    bookDate = dateFns.addDays(bookDate, 1)
    dates.push(bookDate);
    stayCounter--;
  }
}




const samplePosts = [
  {
    price: Math.floor(Math.random()*200),
    serviceFee: Math.floor(Math.random()*100),
    reviewScore: Math.floor(Math.random()*5),
    reviewAmount: Math.floor(Math.random()*200),
    maxGuests: Math.floor(Math.random()*10) + 2,
    maxAdults: Math.floor(Math.random()*5),
    maxChildren: Math.floor(Math.random()*5),
    maxInfants: Math.floor(Math.random()*10),
    minBooking: 2,
    maxBooking: Math.floor(Math.random()*10) + 5,
    reservations: JSON.stringify(dates),
  },
];

const insertSampleBookings = function() {
  Booking.create(samplePosts)
    .then(() => mongoose.disconnect());
};

insertSampleBookings();

// mongoose.disconnect();