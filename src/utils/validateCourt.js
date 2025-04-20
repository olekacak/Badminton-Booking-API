const { isBoolean, isNumber } = require('./validateFields'); // Import utility functions

const validateCourt = (req, res, next) => {
  const { court_number, is_active, is_delete } = req.body;

  // Validate required fields for court creation
  if (court_number === undefined || is_active === undefined || is_delete === undefined) {
    return res.status(400).json({ message: 'Missing required fields: court_number, is_active, is_delete' });
  }

  // Validate types of the fields using utility functions
  if (!isNumber(court_number)) {
    return res.status(400).json({ message: 'court_number must be a number' });
  }

  if (!isBoolean(is_active)) {
    return res.status(400).json({ message: 'is_active must be a boolean' });
  }

  if (!isBoolean(is_delete)) {
    return res.status(400).json({ message: 'is_delete must be a boolean' });
  }

  next(); // Proceed to the next middleware/controller
};

module.exports = validateCourt;
