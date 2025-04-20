const db = require('../config/db');

const courtModel = {
  create: (data, callback) => {
    const { court_number, is_active, is_delete } = data;
    db.run(
      `INSERT INTO court (court_number, is_active, is_delete) VALUES (?, ?, ?)`,
      [court_number, is_active, is_delete],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  getById: (court_id, callback) => {
    db.get(`SELECT * FROM court WHERE court_id = ?`, [court_id], callback);
  },

  getAll: (callback) => {
    db.all(`SELECT * FROM court`, [], callback);
  },

  update: (court_id, data, callback) => {
    const fields = [];
    const values = [];
  
    if (data.court_number !== undefined) {
      fields.push("court_number = ?");
      values.push(data.court_number);
    }
    if (data.is_active !== undefined) {
      fields.push("is_active = ?");
      values.push(data.is_active);
    }
    if (data.is_delete !== undefined) {
      fields.push("is_delete = ?");
      values.push(data.is_delete);
    }
  
    if (fields.length === 0) {
      return callback(new Error("No valid fields provided for update"));
    }
  
    const sql = `UPDATE court SET ${fields.join(", ")} WHERE court_id = ?`;
    values.push(court_id);
  
    db.run(sql, values, function (err) {
      if (err) return callback(err);
      if (this.changes === 0) {
        return callback(new Error("No court found with the given ID"));
      }
      callback(null);
    });
  },  

  delete: (court_id, callback) => {
    db.run(`DELETE FROM court WHERE court_id = ?`, [court_id], callback);
  }
};

module.exports = courtModel;
