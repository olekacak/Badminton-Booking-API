const db = require('../config/db');

const bookingModel = {
  create: (data, callback) => {
    const { user_id, court_id, date, time_slot, created_date } = data;
    db.run(
      `INSERT INTO booking (user_id, court_id, date, time_slot, created_date) VALUES (?, ?, ?, ?, ?)`,
      [user_id, court_id, date, time_slot, created_date],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },
  
  getById: (booking_id, callback) => {
    console.log("Fetching booking with ID:", booking_id);
    db.get(`SELECT * FROM booking WHERE booking_id = ?`, [booking_id], callback);
  },
  getAll: (callback) => {
    db.all(`SELECT * FROM booking`, [], callback);
  },
};

module.exports = bookingModel;
