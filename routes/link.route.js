import { Router } from "express";
import {
  createLink,
  deleteLink,
  getLink,
  getLinks,
  updateLink,
} from "../controllers/link.controller.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import {
  bodyLinkValidator,
  paramValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requiereToken, getLinks);

router.get("/:shortLink", getLink);

router.post("/", requiereToken, bodyLinkValidator, createLink);

router.put(
  "/:id",
  requiereToken,
  paramValidator,
  bodyLinkValidator,
  updateLink
);

router.delete("/:id", requiereToken, paramValidator, deleteLink);

export default router;
