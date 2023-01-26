import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const expiresIn = 60 * 10;

  try {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (id, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === "dev"),
      expires: new Date(Date.now() + 1000 * expiresIn),
      sameSite: "none",
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenVetificationErrors = {
  ["invalid signature"]: "Invalid signature",
  ["jwt must be provided"]: "Invalid credentials",
  ["jwt expired"]: "Session expired",
  ["jwt malformed"]: "Invalid credentials",
  ["No Bearer"]: "Invalid credentials",
};
