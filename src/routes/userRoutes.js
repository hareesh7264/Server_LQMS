const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/auth/refresh-token", refreshToken);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);

module.exports = router;
