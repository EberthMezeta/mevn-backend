import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log("goak");
    console.log(user.password);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password");
  }
});

userSchema.methods.comparePassword = async function (canidatePassword) {
  return await bcrypt.compare(canidatePassword, this.password);
};

export const User = model("User", userSchema);
