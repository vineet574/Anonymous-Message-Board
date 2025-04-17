const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny')); // Logging HTTP requests

// Environment validation
if (!process.env.DB || !process.env.PORT) {
  console.error('Required environment variables are missing');
  process.exit(1); // Exit the process if validation fails
}

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// API routing
app.use('/api', apiRoutes);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
