import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User No exists" });
    }

    const responsePassword = await user.comparePassword(password);

    if (!responsePassword) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  try {
    let user = await User.findOne({ email });

    console.log(user);

    if (user) {
      throw { code: 11000 };
    }

    user = new User({ email, password });

    await user.save();

    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

export const test = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    return res.json(user);
  } catch (error) {}
};

export const refreshToken = async (req, res) => {
  try {
    console.log(req.userId);
    const { token, expiresIn } = generateToken(req.userId);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.json({ error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.json({ message: "Logout" });
};
