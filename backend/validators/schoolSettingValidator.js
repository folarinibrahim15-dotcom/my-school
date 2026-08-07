import { body } from "express-validator";

export const updateSchoolSettingValidation = [

  body("schoolName")
    .optional()
    .notEmpty()
    .withMessage("School name cannot be empty."),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email."),

  body("website")
    .optional()
    .isURL()
    .withMessage("Invalid website URL."),

];