import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Subject Validation
|--------------------------------------------------------------------------
*/

export const createSubjectValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required."),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Subject code is required."),

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

  body("department")
    .notEmpty()
    .withMessage("Department is required.")
    .isMongoId()
    .withMessage("Department must be a valid ID."),

  body("teacher")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Teacher must be a valid ID."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isCompulsory")
    .optional()
    .isBoolean()
    .withMessage("isCompulsory must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Subject Validation
|--------------------------------------------------------------------------
*/

export const updateSubjectValidation = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subject name cannot be empty."),

  body("code")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subject code cannot be empty."),

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

  body("department")
    .optional()
    .isMongoId()
    .withMessage("Department must be a valid ID."),

  body("teacher")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Teacher must be a valid ID."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isCompulsory")
    .optional()
    .isBoolean()
    .withMessage("isCompulsory must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];