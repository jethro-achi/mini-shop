require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/productroute');
const orderRoutes = require('./routes/orderRoute');

const app = express();
const PORT = process.env.PORT || 3100;
const MONGODB_URI = process.env.URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic error handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
