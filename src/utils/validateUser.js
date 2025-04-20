// A simple example validation function to check if a user has a valid email and phone number
const validateUser = (req, res, next) => {
    const { name, email, phoneNum } = req.body;
  
    if (!name || !email || !phoneNum) {
      return res.status(400).json({ message: 'Name, email, and phone number are required' });
    }
  
    // You can add more validation logic here
    // For example, check if the email is in the correct format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    // Example: You can validate phone number if needed
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNum)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
  
    // If everything is valid, move to the next middleware
    next();
  };
  
  module.exports = validateUser;
  