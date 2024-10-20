const mongoose = require('mongoose');

const soldItemSchema = new mongoose.Schema({
  sold_itemId: { type: String, required: true, unique: true }, // Adjust this based on your schema
  itemId: { type: String, required: true },
  sold_quantity: { type: Number, required: true },
  sold_cost: { type: Number, required: true },
  soldCreatedBy: { type: String, required: true },
  orgId: { type: String, required: true },
  soldCreatedAt: { type: Date, default: Date.now }
});


const SoldItem = mongoose.model('SoldItem', soldItemSchema);
module.exports = SoldItem;
