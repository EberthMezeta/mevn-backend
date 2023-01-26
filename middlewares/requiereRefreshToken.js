import { tokenVetificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";
export const requiereRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("reahs:" + refreshToken);
    if (!refreshToken) {
      console.log("no hay token");
      throw new Error("Token no exist");
    }

    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(id);
    req.userId = id;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: tokenVetificationErrors[error.message] });
  }
};
