import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  longLink: {
    type: String,
    required: true,
    trim: true,
  },
  shortLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Link = model("Link", linkSchema);
