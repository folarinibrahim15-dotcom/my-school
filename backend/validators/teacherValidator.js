import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Teacher Validation
|--------------------------------------------------------------------------
*/

export const createTeacherValidation = [

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

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required."),

  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required."),

  body("employmentDate")
    .notEmpty()
    .withMessage("Employment date is required."),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required."),

];