import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Update About Validation
|--------------------------------------------------------------------------
*/

export const updateAboutValidation = [

  body("schoolName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("School name cannot be empty."),

  body("history")
    .optional()
    .isString()
    .withMessage("History must be a string."),

  body("mission")
    .optional()
    .isString()
    .withMessage("Mission must be a string."),

  body("vision")
    .optional()
    .isString()
    .withMessage("Vision must be a string."),

  body("philosophy")
    .optional()
    .isString()
    .withMessage("Philosophy must be a string."),

  body("principalMessage")
    .optional()
    .isString()
    .withMessage("Principal message must be a string."),

  body("principalName")
    .optional()
    .trim()
    .isString()
    .withMessage("Principal name must be a string."),

];