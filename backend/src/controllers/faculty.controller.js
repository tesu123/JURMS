import mongoose from "mongoose";
import { Faculty } from "../models/faculty.model.js";
import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @desc Add new Faculty (supports both department code and ObjectId)
 * @route POST /api/v1/faculties/add
 */
export const addFaculty = async (req, res) => {
  try {
    const { name, email, designation, contact, department } = req.body;

    // 🧩 Validation
    if (!name || !email || !designation || !contact || !department) {
      throw new ApiError(400, "All fields are required");
    }

    // 🧩 Check duplicate email (case-insensitive)
    const exists = await Faculty.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (exists) {
      throw new ApiError(400, "Faculty with this email already exists");
    }

    // 🧩 Validate & resolve department
    let dept;
    if (mongoose.isValidObjectId(department)) {
      // If frontend sends ObjectId
      dept = await Department.findById(department);
    } else {
      // If frontend sends department code like "CSE"
      dept = await Department.findOne({ code: department.toUpperCase() });
    }

    if (!dept) {
      throw new ApiError(400, "Invalid department code or ID");
    }

    // ✅ Create faculty record
    const faculty = await Faculty.create({
      name,
      email: email.toLowerCase(),
      designation,
      contact,
      department: dept._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, faculty, "Faculty added successfully"));
  } catch (error) {
    console.error("Error adding faculty:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

/**
 * @desc Get all Faculties
 * @route GET /api/v1/faculties
 */
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find()
      .populate("department", "code name")
      .sort({ name: 1 });

    if (!faculties || faculties.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No faculties found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, faculties, "Faculties fetched successfully"));
  } catch (error) {
    console.error("Error fetching faculties:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

/**
 * @desc Delete Faculty
 * @route DELETE /api/v1/faculties/:id
 */
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Faculty.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Faculty not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Faculty deleted successfully"));
  } catch (error) {
    console.error("Error deleting faculty:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};
