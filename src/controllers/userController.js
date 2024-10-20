const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require("../utils/responseHandlers");
const {
  generateToken,
  generateRefreshToken,
} = require("../services/authService");

exports.registerUser = async (req, res) => {
  const { userId, userName, password, orgId, orgName, isActive } = req.body;
  console.log(req.body);
  if (!userId || !userName || !password || !orgId || !orgName) {
    return res.status(400).json(errorResponse("All fields are required."));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId,
      userName,
      password: hashedPassword,
      orgId,
      orgName,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newUser.save();
    return res
      .status(201)
      .json(successResponse("User registered successfully.", newUser));
  } catch (error) {
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

// Login User function
exports.loginUser = async (req, res) => {
  const { userId, password } = req.body;

  // Validate request data
  if (!userId || !password) {
    return res
      .status(400)
      .json(errorResponse("User ID and password are required."));
  }

  try {
    // Log incoming request for debugging
    console.log("Login attempt:", req.body);

    // Find user by userId
    const user = await User.findOne({ userId });
    console.log("User found:", user);

    // Validate user and password
    if (!user) {
      return res.status(401).json(errorResponse("Invalid credentials."));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json(errorResponse("Invalid credentials."));
    }
    const token = generateToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);

    // Store refreshToken in the database or in memory (this is a simple example)
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(200).json({ token, refreshToken, user });
  } catch (error) {
    console.error("Login error:", error); // Log error for debugging
    return res
      .status(500)
      .json(errorResponse("Internal server error. Please try again later."));
  }
};

// Refresh token controller function
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    // Find user with the provided refresh token
    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newToken = generateToken(decoded.userId);

      // Send the new token
      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    return res
      .status(200)
      .json(successResponse("User profile retrieved successfully.", user));
  } catch (error) {
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

exports.updateUserProfile = async (req, res) => {
  const { userName, isActive } = req.body;

  try {
    await User.updateOne(
      { userId: req.user.userId },
      { userName, isActive, updatedAt: new Date() }
    );
    return res
      .status(200)
      .json(successResponse("User profile updated successfully."));
  } catch (error) {
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};
