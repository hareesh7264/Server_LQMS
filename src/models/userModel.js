const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedAt: { type: Date, default: Date.now },
  updatedBy: String,
  orgId: String,
  isActive: { type: Boolean, default: true },
  orgName: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
