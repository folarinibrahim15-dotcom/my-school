import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Curriculum Validation
|--------------------------------------------------------------------------
*/

export const createCurriculumValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Curriculum title is required."),

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

  body("subject")
    .notEmpty()
    .withMessage("Subject is required.")
    .isMongoId()
    .withMessage("Subject must be a valid ID."),

  body("academicSession")
    .trim()
    .notEmpty()
    .withMessage("Academic session is required."),

  body("term")
    .optional()
    .isIn([
      "First Term",
      "Second Term",
      "Third Term",
      "Full Session",
    ])
    .withMessage("Invalid term selected."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Curriculum Validation
|--------------------------------------------------------------------------
*/

export const updateCurriculumValidation = [

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Curriculum title cannot be empty."),

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

  body("subject")
    .optional()
    .isMongoId()
    .withMessage("Subject must be a valid ID."),

  body("academicSession")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Academic session cannot be empty."),

  body("term")
    .optional()
    .isIn([
      "First Term",
      "Second Term",
      "Third Term",
      "Full Session",
    ])
    .withMessage("Invalid term selected."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];