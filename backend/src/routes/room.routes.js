import { Router } from "express";

import {
  addRoom,
  getRooms,
  deleteRoom,
} from "../controllers/room.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Base URL: /api/rooms
router.route("/add-room").post(addRoom);
router.route("/get-rooms").get(getRooms);
router.route("/delete-room/:id").delete(deleteRoom);

export default router;
