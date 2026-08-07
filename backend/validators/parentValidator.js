import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Parent Validation
|--------------------------------------------------------------------------
*/

export const createParentValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required."),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("occupation")
    .optional()
    .trim(),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required."),

  body("relationship")
    .isIn([
      "Father",
      "Mother",
      "Guardian",
    ])
    .withMessage(
      "Relationship must be Father, Mother or Guardian."
    ),
];