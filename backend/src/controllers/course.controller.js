import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createCourse = async (req, res) => {
  try {
    const { name, department } = req.body;

    if (!name || !department) {
      throw new ApiError(400, "Course name and department are required");
    }

    // Check duplicate course name (case-insensitive)
    const exists = await Course.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (exists) {
      throw new ApiError(400, "Course already exists");
    }

    // Validate and resolve department (either ObjectId or code)
    let dept;
    if (mongoose.isValidObjectId(department)) {
      dept = await Department.findById(department);
    } else {
      dept = await Department.findOne({ code: department.toUpperCase() });
    }

    if (!dept) {
      throw new ApiError(400, "Invalid department code or ID");
    }

    // Create course
    const course = await Course.create({
      name,
      department: dept._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, course, "Course created successfully"));
  } catch (error) {
    console.error("Error creating course:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("department", "code name");

    if (!courses || courses.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No courses found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, courses, "Courses fetched successfully"));
  } catch (error) {
    console.error("Error fetching courses:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Course not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Course deleted successfully"));
  } catch (error) {
    console.error("Error deleting course:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};
