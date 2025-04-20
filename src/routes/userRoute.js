const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../utils/validateUser'); // Optional validation if needed

// POST request to create a new user
router.post('/', validateUser, userController.postUser);

// PUT request to update a user
router.post('/:user_id', validateUser, userController.postUser);

// GET request to fetch a specific user by ID
router.get('/:user_id', userController.getUser);

// GET request to fetch all users
router.get('/', userController.getUser);

// DELETE request to delete a user
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
