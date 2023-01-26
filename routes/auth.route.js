import { Router } from "express";
import {
  login,
  register,
  test,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationsResultExpress.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import { requiereRefreshToken } from "../middlewares/requiereRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/login", bodyLoginValidator, login);

router.post("/register", bodyRegisterValidator, register);

router.get("/test", requiereToken, test);

router.get("/refresh", requiereRefreshToken, refreshToken);

router.get("/logout", logout);

export default router;
