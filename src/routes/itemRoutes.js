const express = require("express");
const {
  addItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../controllers/itemController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authenticateToken, addItem);
router.get("/", authenticateToken, getAllItems);
router.get("/:id", authenticateToken, getItemById);
router.put("/:id", authenticateToken, updateItemById);
router.delete("/:id", authenticateToken, deleteItemById);

module.exports = router;
