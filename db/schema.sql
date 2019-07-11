USE bookings;

CREATE TABLE bookingData (
  id NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price FLOAT(8, 2),
  serviceFee FLOAT(8,2),
  reviewScore FLOAT(3,2),
  reviewAmount INT,
  maxGuests INT,
  maxAdults INT,
  maxChildren INT,
  maxInfants INT,
  minBooking INT,
  maxBooking INT,
  reservations TEXT
);