import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Facility Validation
|--------------------------------------------------------------------------
*/

export const createFacilityValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Facility title is required."),

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

  body("category")
    .optional()
    .isIn([
      "Academic",
      "Sports",
      "Laboratory",
      "Technology",
      "Hostel",
      "Medical",
      "Library",
      "Transportation",
      "Others",
    ])
    .withMessage("Invalid facility category."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Facility Validation
|--------------------------------------------------------------------------
*/

export const updateFacilityValidation = [

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Facility title cannot be empty."),

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

  body("category")
    .optional()
    .isIn([
      "Academic",
      "Sports",
      "Laboratory",
      "Technology",
      "Hostel",
      "Medical",
      "Library",
      "Transportation",
      "Others",
    ])
    .withMessage("Invalid facility category."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];
