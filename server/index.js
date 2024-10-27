require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
const port = process.env.PORT || 3001;


// Allow requests from http://localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as needed
    credentials: true, // Enable this if cookies or auth headers are sent
};

app.use(cors(corsOptions));

app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Available routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Export the app for Vercel
module.exports = app;
