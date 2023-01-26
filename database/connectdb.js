import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
  await mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.URI_MONGO).then(() => {
    console.log("Connected to database");
  });
} catch (error) {
  console.log("Error connecting to database: ", error);
}
