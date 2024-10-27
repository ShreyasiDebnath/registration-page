require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
    origin: 'https://registration-page-client.vercel.app', // Allow only your client origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
    credentials: true, // Allow credentials (if necessary)
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(express.json());

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Available routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
// Export the app for Vercel
module.exports = app;
