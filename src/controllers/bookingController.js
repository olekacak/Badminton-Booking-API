const bookingModel = require('../models/bookingModel');
const courtModel = require('../models/courtModel'); 
const formatDate = require('../utils/formatDate');

exports.addBooking = async (req, res, next) => {
  try {
    const data = req.body;
    const courtId = data.court_id;
    data.created_date = formatDate();

    // Check if the court is available
    const court = await new Promise((resolve, reject) => {
      courtModel.getById(courtId, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!court || court.is_active !== 1 || court.is_delete !== 0) {
      return res.status(400).json({
        message: 'Court is not available for booking',
      });
    }

    // Create booking
    const booking_id = await new Promise((resolve, reject) => {
      bookingModel.create(data, (err, id) => {
        if (err) reject(err);
        else resolve(id);
      });
    });

    // Update court to mark it as booked
    await new Promise((resolve, reject) => {
      courtModel.update(courtId, { is_active: 0, is_delete: 1 }, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Retrieve newly created booking
    const booking = await new Promise((resolve, reject) => {
      bookingModel.getById(booking_id, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    res.status(200).json({
      message: 'Booking created successfully',
      booking: booking,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking_id = req.params.booking_id;

    if (booking_id !== undefined) {
      // Fetch booking by ID
      const booking = await new Promise((resolve, reject) => {
        bookingModel.getById(booking_id, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      return res.json(booking);
    }

    // Fetch all bookings
    bookingModel.getAll((err, rows) => {
      if (err) {
        console.error('Error fetching all bookings:', err);
        return next(err);
      }

      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }

      return res.json(rows);
    });
  } catch (err) {
    next(err);
  }
};

