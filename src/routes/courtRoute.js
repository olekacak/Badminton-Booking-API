const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');
const validateCourt = require('../utils/validateCourt'); // Optional validation if needed

// POST request for creating a new court
router.post('/', validateCourt, courtController.addCourt);

// PUT request for updating a court
router.post('/:court_id', validateCourt, courtController.addCourt);

// GET request for fetching a court by ID
router.get('/', courtController.getCourt);

// GET request for fetching all courts
router.get('/:court_id', courtController.getCourt);

// DELETE request for deleting a court
router.delete('/:court_id', courtController.deleteCourt);

module.exports = router;    
