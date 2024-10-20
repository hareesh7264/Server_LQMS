// models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  item_quantity: { type: Number, required: true },
  item_cost: { type: Number, required: true },
  orgId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Ensure you're exporting the model correctly
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
