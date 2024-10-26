// require('dotenv').config()
// const express = require('express')
// var cors = require('cors')
// const connectToMongo = require('./db')
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/userRoutes');
// connectToMongo();

// const app = express()
// const port = process.env.PORT

// app.use(cors())
// app.use(express.json());

// //Available routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
