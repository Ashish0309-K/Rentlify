const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGODB_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Database connection and server start
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(error => console.error('MongoDB connection error:', error));
