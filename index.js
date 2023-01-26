import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import express from "express";
import "./database/connectdb.js";
import authRoute from "./routes/auth.route.js";
import linkRoute from "./routes/link.route.js";
import redirectRoute from "./routes/redirect.route.js";

import cors from "cors";

const APP = express();
const PORT = process.env.PORT || 3000;
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

APP.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Not allowed by CORS");
    },
    credentials: true,
  })
);

APP.use(express.json());
APP.use(cookieParser());

APP.use("/", redirectRoute);
APP.use("/api/v1/auth", authRoute);
APP.use("/api/v1/links", linkRoute);

APP.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
