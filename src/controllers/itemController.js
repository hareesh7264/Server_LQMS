const Item = require("../models/itemModel");
const { successResponse, errorResponse } = require("../utils/responseHandlers");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example of a route to add an item
exports.addItem = async (req, res) => {
  const { itemId, itemName, item_quantity, item_cost, orgId, isActive } =
    req.body;
  console.log(req.body);
  try {
    // Ensure all required fields are present
    if (!itemId || !itemName || !item_quantity || !item_cost || !orgId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Create a new item object
    const newItem = new Item({
      itemId,
      itemName,
      item_quantity,
      item_cost,
      orgId,
      isActive,
    });

    // Save the item to the database
    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Item added successfully.",
      data: newItem,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding item.",
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res
      .status(200)
      .json(successResponse("Items retrieved successfully.", items));
  } catch (error) {
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query by custom `itemId` instead of MongoDB's default `_id`
    const item = await Item.find({ orgId: id });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item retrieved successfully.",
      data: item,
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.updateItemById = async (req, res) => {
  const { id } = req.params; // `id` from the route parameter
  const { itemName, item_quantity, item_cost, isActive } = req.body; // Fields to update

  try {
    // Find the item by `itemId` and update it
    const updatedItem = await Item.findOneAndUpdate(
      { itemId: id }, // Match by `itemId`
      {
        itemName,
        item_quantity,
        item_cost,
        isActive,
        updatedAt: new Date(), // Update the `updatedAt` timestamp
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.deleteItemById = async (req, res) => {
  const { id } = req.params; // `id` from the route parameter

  try {
    // Find the item by `itemId` and delete it
    const deletedItem = await Item.findOneAndDelete({ itemId: id });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
