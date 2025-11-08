import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addDepartment = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    if (!code || !name) {
      throw new ApiError(400, "Department code and name are required");
    }

    const exists = await Department.findOne({ code: code.toUpperCase() });
    if (exists) {
      throw new ApiError(400, "Department code already exists");
    }

    const department = await Department.create({
      code: code.toUpperCase(),
      name,
      description,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, department, "Department created successfully"));
  } catch (error) {
    console.error("Error adding department:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new ApiResponse(status, {}, error.message || "Server Error"));
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ code: 1 });

    if (!departments || departments.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No departments found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, departments, "Departments fetched successfully"));
  } catch (error) {
    console.error("Error fetching departments:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new ApiResponse(status, {}, error.message || "Server Error"));
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Department not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Department deleted successfully"));
  } catch (error) {
    console.error("Error deleting department:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new ApiResponse(status, {}, error.message || "Server Error"));
  }
};
