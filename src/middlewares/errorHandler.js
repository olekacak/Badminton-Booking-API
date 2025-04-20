module.exports = (err, req, res, next) => {
  console.error("Error details:", err.stack); // Log the full error stack
  console.error("Request body:", req.body);  // Log the incoming request body
  res.status(500).json({ error: 'Something went wrong' });
};
// This middleware should be added after all routes and other middlewares in your app.js file