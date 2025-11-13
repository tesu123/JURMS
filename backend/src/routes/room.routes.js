import { Router } from "express";

import {
  addRoom,
  getRooms,
  deleteRoom,
} from "../controllers/room.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";


const router = Router();

// // Base URL: /api/rooms
// router.route("/add-room").post(addRoom);
// router.route("/get-rooms").get(getRooms);
// router.route("/delete-room/:id").delete(deleteRoom);


router.route("/add-room")
    .post(verifyJWT, authorizeRoles("admin"), addRoom);

router.route("/get-rooms")
    .get(verifyJWT, getRooms);

router.route("/delete-room/:id")
    .delete(verifyJWT, authorizeRoles("admin"), deleteRoom);

export default router;
