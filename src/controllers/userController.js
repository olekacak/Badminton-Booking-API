const userModel = require('../models/userModel');
const formatDate = require('../utils/formatDate');

// Create or update user based on user_id
exports.postUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id || req.body.user_id; // <== use param first
    const { name, email, phoneNum, created_date } = req.body;

    if (!name || !email || !phoneNum) {
      return res.status(400).json({ message: 'Name, email, and phoneNum are required' });
    }

    const formattedDate = formatDate(created_date || new Date());
    const userData = { name, email, phoneNum, created_date: formattedDate };

    if (user_id) {
      await new Promise((resolve, reject) => {
        userModel.updateUser(user_id, userData, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      return res.status(200).json({
        message: 'User updated successfully',
        user: { user_id, ...userData },
      });
    } else {
      const createdUserId = await new Promise((resolve, reject) => {
        userModel.createUser(userData, (err, userId) => {
          if (err) return reject(err);
          resolve(userId);
        });
      });

      return res.status(201).json({
        message: 'User created successfully',
        user: { user_id: createdUserId, ...userData },
      });
    }
  } catch (err) {
    next(err);
  }
};

// Get user by ID or all users
exports.getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (user_id) {
      // Get specific user by ID
      const user = await new Promise((resolve, reject) => {
        userModel.getUserById(user_id, (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } else {
      // Get all users
      const users = await new Promise((resolve, reject) => {
        userModel.getAllUsers((err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });

      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      return res.json(users);
    }
  } catch (err) {
    next(err);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    await new Promise((resolve, reject) => {
      userModel.deleteUser(user_id, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
