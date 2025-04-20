const express = require('express');
const bodyParser = require('body-parser');
const bookingRoute = require('./routes/bookingRoute');
const courtRoute = require('./routes/courtRoute');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/booking', bookingRoute);
app.use('/api/court', courtRoute);
app.use('/api/user', userRoute);
app.use(errorHandler);

  
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
