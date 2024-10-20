const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    mongodbURI: process.env.MONGO_URI, // Updated to use MONGO_URI
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,   // Add JWT_SECRET
};

module.exports = config;
