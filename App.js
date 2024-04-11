// const express= require('express');
import "dotenv/config";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/router.js";
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://omagarwal86:sFHWYfSd1omR3XWe@cluster0.zvlskcb.mongodb.net/"
);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "*",
    credentials: true,
  })
);
const sessionOptions = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: true,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    maxAge: 60000,
  };
}
app.use(express.json());
app.use(session(sessionOptions));
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);

Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);


