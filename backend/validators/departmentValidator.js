import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Department Validation
|--------------------------------------------------------------------------
*/

export const createDepartmentValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required."),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("academicLevel")
    .notEmpty()
    .withMessage("Academic level is required.")
    .isMongoId()
    .withMessage("Academic level must be a valid ID."),

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
| Update Department Validation
|--------------------------------------------------------------------------
*/

export const updateDepartmentValidation = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Department name cannot be empty."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("academicLevel")
    .optional()
    .isMongoId()
    .withMessage("Academic level must be a valid ID."),

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