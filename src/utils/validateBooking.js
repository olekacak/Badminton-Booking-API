const validateBooking = (req, res, next) => {
  const { user_id, court_id, date, time_slot } = req.body;

  if (!user_id || !court_id || !date || !time_slot) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next(); // Proceed to the next middleware/controller
};

module.exports = validateBooking;
