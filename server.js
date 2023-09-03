const express = require('express');
const path = require('path');

// Initialize the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Routes
const apiRoutes = require('./routes/api_routes');
const htmlRoutes = require('./routes/html_routes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// General Error Handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  