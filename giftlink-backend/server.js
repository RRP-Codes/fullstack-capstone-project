// server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import your auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
