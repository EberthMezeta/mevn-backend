import jwt from "jsonwebtoken";
import { tokenVetificationErrors } from "../utils/tokenManager.js";

export const requiereToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) {
      throw new Error("No Bearer");
    }

    token = token.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    console.log(id);
    req.userId = id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: tokenVetificationErrors[error.message] });
  }
};
