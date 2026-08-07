import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Academic Level Validation
|--------------------------------------------------------------------------
*/

export const createAcademicLevelValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Academic level name is required."),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Academic Level Validation
|--------------------------------------------------------------------------
*/

export const updateAcademicLevelValidation = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Academic level name cannot be empty."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];