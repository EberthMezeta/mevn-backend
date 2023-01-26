import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export const bodyLoginValidator = [
  body("email", "Please enter a valid email").trim().isEmail().normalizeEmail(),
  body("password", "Please enter a valid password").trim().isLength({ min: 8 }),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Please enter a valid email").trim().isEmail().normalizeEmail(),
  body("password", "Please enter a valid password")
    .trim()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Passwords have to match!");
      } else {
        return value;
      }
    }),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "Please enter a valid link").trim().isURL(),
  validationResultExpress,
];

export const paramValidator = [
  param("id", "Please enter a valid id").trim().notEmpty().escape(),
  validationResultExpress,
];
