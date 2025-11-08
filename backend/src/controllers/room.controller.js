import mongoose from "mongoose";
import { Room } from "../models/room.model.js";
import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addRoom = async (req, res) => {
  try {
    const { name, capacity, type, department } = req.body;

    // Validate all required fields
    if (!name || !capacity || !type || !department) {
      throw new ApiError(400, "All fields are required");
    }

    // Check for existing room by name (case-insensitive)
    const exists = await Room.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (exists) {
      throw new ApiError(400, "Room already exists");
    }

    // Resolve department (supports both code and ObjectId)
    let dept;
    if (mongoose.isValidObjectId(department)) {
      dept = await Department.findById(department);
    } else {
      dept = await Department.findOne({ code: department.toUpperCase() });
    }

    if (!dept) {
      throw new ApiError(400, "Invalid department code or ID");
    }

    // Create new room
    const room = await Room.create({
      name,
      capacity: Number(capacity),
      type,
      department: dept._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, room, "Room added successfully"));
  } catch (error) {
    console.error("Error adding room:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("department", "code name")
      .sort({ name: 1 });

    if (!rooms || rooms.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No rooms found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, rooms, "Rooms fetched successfully"));
  } catch (error) {
    console.error("Error fetching rooms:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Room.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Room not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Room deleted successfully"));
  } catch (error) {
    console.error("Error deleting room:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};
