const db = require('../config/db');

const userModel = {
  // Create a new user
  createUser: (userData, callback) => {
    const { name, email, phoneNum, created_date } = userData;
    const query = `INSERT INTO "user" ("name", "email", "phoneNum", "created_date") VALUES (?, ?, ?, ?)`;

    db.run(query, [name, email, phoneNum, created_date], function (err) {
      if (err) return callback(err);
      callback(null, this.lastID); // Return the ID of the created user
    });
  },

  // Get user by ID
  getUserById: (user_id, callback) => {
    const query = `SELECT * FROM "user" WHERE "user_id" = ?`;
    db.get(query, [user_id], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  },

  // Get all users
  getAllUsers: (callback) => {
    const query = `SELECT * FROM "user"`;
    db.all(query, [], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  // Update user by ID
  updateUser: (user_id, userData, callback) => {
    const { name, email, phoneNum, created_date } = userData;
    const query = `UPDATE "user" SET "name" = ?, "email" = ?, "phoneNum" = ?, "created_date" = ? WHERE "user_id" = ?`;

    db.run(query, [name, email, phoneNum, created_date, user_id], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  },

  // Delete user by ID
  deleteUser: (user_id, callback) => {
    const query = `DELETE FROM "user" WHERE "user_id" = ?`;

    db.run(query, [user_id], function (err) {
      if (err) return callback(err);
      callback(null);
    });
  }
};

module.exports = userModel;
