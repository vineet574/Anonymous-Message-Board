const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// API routing
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
