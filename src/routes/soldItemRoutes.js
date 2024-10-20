const express = require('express');
const {
  addSoldItem,
  getAllSoldItems,
  getSoldItemById,
  updateSoldItem,
  deleteSoldItem
} = require('../controllers/soldItemController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Define routes
router.post('/', authenticateToken, addSoldItem);  // Create sold item
router.get('/', authenticateToken, getAllSoldItems);  // Retrieve all sold items
router.get('/:id', authenticateToken, getSoldItemById);  // Retrieve sold item by ID
router.put('/:id', authenticateToken, updateSoldItem);  // Update sold item by ID
router.delete('/:id', authenticateToken, deleteSoldItem);  // Delete sold item by ID

module.exports = router;
