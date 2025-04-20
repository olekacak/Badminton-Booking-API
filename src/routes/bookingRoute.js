const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const validateBooking = require('../utils/validateBooking');

// POST request for creating a booking
router.post('/', validateBooking, bookingController.addBooking);

// GET request for fetching a booking by ID
router.get('/:booking_id', bookingController.getBooking);

// GET request for fetching all bookings
router.get('/', bookingController.getBooking);

module.exports = router;
