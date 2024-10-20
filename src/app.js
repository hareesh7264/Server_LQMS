const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes"); // Ensure this is exporting a function (router)
const itemRoutes = require("./routes/itemRoutes"); // Same here
const soldItemRoutes = require("./routes/soldItemRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware"); // Ensure this is a function

dotenv.config();
// Connect to the database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

// Define CORS options
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/soldItems", soldItemRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app object for testing or other use
module.exports = app;
