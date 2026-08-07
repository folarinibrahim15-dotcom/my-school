import { body } from "express-validator";

export const createAdmissionValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters."),

  body("parentEmail")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("A valid parent email address is required."),

body("parentPhone")
  .trim()
  .notEmpty()
  .withMessage("Parent phone number is required."),

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required."),

  body("classApplyingFor")
    .trim()
    .notEmpty()
    .withMessage("Class applying for is required."),

  body("parentName")
    .trim()
    .notEmpty()
    .withMessage("Parent/Guardian name is required."),

  body("parentPhone")
    .trim()
    .notEmpty()
    .withMessage("Parent phone number is required."),
];