require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/booksdb';

app.use(express.json());

app.use('/api/books', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
