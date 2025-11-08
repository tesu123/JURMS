import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { verifyJWT } from "./middlewares/auth.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running fine !!!");
});

//import routes
import userRouter from "./routes/user.routes.js";
import departmentRouter from "./routes/department.routes.js";
import courseRouter from "./routes/course.routes.js";
import roomRouter from "./routes/room.routes.js";
import facultyRouter from "./routes/faculty.routes.js";
import routineRouter from "./routes/routine.routes.js";

//route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/faculties", facultyRouter);
app.use("/api/v1/routines", routineRouter);

export { app };
