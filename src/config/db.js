const mongoose = require('mongoose');
const config = require('../config/env');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbURI, { // Use mongodbURI from config
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Optional: Increase timeout
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
