const SoldItem = require("../models/soldItemModel");
const { successResponse, errorResponse } = require("../utils/responseHandlers");
const mongoose = require("mongoose");

exports.addSoldItem = async (req, res) => {
  const {
    sold_itemId,
    itemId,
    sold_quantity,
    sold_cost,
    soldCreatedBy,
    orgId,
  } = req.body;

  try {
    const newSoldItem = new SoldItem({
      sold_itemId,
      itemId,
      sold_quantity,
      sold_cost,
      soldCreatedBy,
      orgId,
      soldCreatedAt: new Date(),
    });

    console.log("New SoldItem:", newSoldItem); // Log the new SoldItem

    await newSoldItem.save(); // Attempt to save to the database

    return res
      .status(201)
      .json(successResponse("Sold item created successfully.", newSoldItem));
  } catch (error) {
    console.error("Error saving sold item:", error); // Log detailed error
    return res
      .status(500)
      .json(errorResponse("Something went wrong", error.message)); // Include error message in the response
  }
};

exports.getAllSoldItems = async (req, res) => {
  try {
    const soldItems = await SoldItem.find();
    return res
      .status(200)
      .json(successResponse("Sold items retrieved successfully.", soldItems));
  } catch (error) {
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

exports.getSoldItemById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query the SoldItem collection to find the document with the matching sold_itemId
    const soldItem = await SoldItem.find({ orgId: id });

    if (!soldItem) {
      return res.status(404).json(errorResponse("Sold item not found."));
    }

    return res
      .status(200)
      .json(successResponse("Sold item retrieved successfully.", soldItem));
  } catch (error) {
    console.error("Error retrieving sold item:", error); // Log the error for debugging
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

exports.updateSoldItem = async (req, res) => {
  const { sold_quantity, sold_cost } = req.body;
  const { id } = req.params; // Extract sold_itemId from request parameters

  try {
    const result = await SoldItem.updateOne(
      { sold_itemId: id },
      { sold_quantity, sold_cost }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json(errorResponse("Sold item not found or no changes made."));
    }

    return res
      .status(200)
      .json(successResponse("Sold item updated successfully."));
  } catch (error) {
    console.error("Error updating sold item:", error); // Log the error for debugging
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};

exports.deleteSoldItem = async (req, res) => {
  const { id } = req.params; // Extract sold_itemId from request parameters

  try {
    const result = await SoldItem.deleteOne({ sold_itemId: id });

    if (result.deletedCount === 0) {
      return res.status(404).json(errorResponse("Sold item not found."));
    }

    return res
      .status(200)
      .json(successResponse("Sold item deleted successfully."));
  } catch (error) {
    console.error("Error deleting sold item:", error); // Log the error for debugging
    return res.status(500).json(errorResponse("Something went wrong"));
  }
};
