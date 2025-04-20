const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('C:/Users/Ole Kacak/Desktop/Interview/Datum/Badminton Court Booking API/booking.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Database connected');
  }
}).run('PRAGMA busy_timeout = 100000'); // Set busy timeout to 10 seconds

module.exports = db;
