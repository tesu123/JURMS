import mongoose from "mongoose";
import { Routine } from "../models/routine.model.js";
import { Course } from "../models/course.model.js";
import { Department } from "../models/department.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addRoutine = async (req, res) => {
  try {
    const { course, department, semester, subject, faculty, room, day, time } =
      req.body;

    // Validate required fields
    if (
      !course ||
      !department ||
      !semester ||
      !subject ||
      !faculty ||
      !room ||
      !day ||
      !time
    ) {
      throw new ApiError(400, "All fields are required");
    }

    // Utility to resolve references
    const resolveReference = async (Model, value, key = "name") => {
      if (mongoose.isValidObjectId(value)) return await Model.findById(value);
      if (key === "code")
        return await Model.findOne({ code: value.toUpperCase() });
      return await Model.findOne({ [key]: value });
    };

    const courseDoc = await resolveReference(Course, course);
    const departmentDoc = await resolveReference(
      Department,
      department,
      "code"
    );
    const facultyDoc = await resolveReference(Faculty, faculty);
    const roomDoc = await resolveReference(Room, room);

    if (!courseDoc || !departmentDoc || !facultyDoc || !roomDoc) {
      throw new ApiError(
        400,
        "Invalid course, department, faculty, or room reference"
      );
    }

    // -----------------------------------------
    // 🟥 CHECK FOR ALL POSSIBLE CONFLICTS
    // -----------------------------------------

    const conflictQuery = {
      day,
      time,
      $or: [
        { faculty: facultyDoc._id }, // faculty conflict
        { room: roomDoc._id }, // room conflict
        { course: courseDoc._id }, // course conflict (your request)
        { department: departmentDoc._id }, // department conflict
      ],
    };

    const existingConflict = await Routine.findOne(conflictQuery);

    if (existingConflict) {
      let reason = "";

      if (existingConflict.faculty.equals(facultyDoc._id)) {
        reason = "Faculty already assigned in this time slot.";
      } else if (existingConflict.room.equals(roomDoc._id)) {
        reason = "Room already assigned in this time slot.";
      } else if (existingConflict.course.equals(courseDoc._id)) {
        reason = "Same course already has another class at this time.";
      } else if (existingConflict.department.equals(departmentDoc._id)) {
        reason = "This department already has another class at the same time.";
      } else {
        reason = "Conflict detected!";
      }

      throw new ApiError(400, `⚠️ Conflict: ${reason}`);
    }

    // -----------------------------------------
    // 🟦 Prevent exact duplicate routine
    // -----------------------------------------
    const duplicateRoutine = await Routine.findOne({
      course: courseDoc._id,
      department: departmentDoc._id,
      semester,
      subject,
      faculty: facultyDoc._id,
      room: roomDoc._id,
      day,
      time,
    });

    if (duplicateRoutine) {
      throw new ApiError(400, "This exact routine entry already exists.");
    }

    // -----------------------------------------
    // 🟩 CREATE ROUTINE
    // -----------------------------------------
    const routine = await Routine.create({
      course: courseDoc._id,
      department: departmentDoc._id,
      semester,
      subject,
      faculty: facultyDoc._id,
      room: roomDoc._id,
      day,
      time,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, routine, "Routine created successfully"));
  } catch (error) {
    console.error("Error adding routine:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(
          status,
          {},
          error.message || "Internal Server Error while creating routine"
        )
      );
  }
};

export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find()
      .populate("course", "name")
      .populate("department", "code name")
      .populate("faculty", "name email")
      .populate("room", "name type")
      .sort({ day: 1, time: 1 });

    if (!routines || routines.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No routines found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, routines, "Routines fetched successfully"));
  } catch (error) {
    console.error("Error fetching routines:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Routine.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Routine not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Routine deleted successfully"));
  } catch (error) {
    console.error("Error deleting routine:", error);
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new ApiResponse(status, {}, error.message || "Internal Server Error")
      );
  }
};
