import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Alumni Validation
|--------------------------------------------------------------------------
*/

export const createAlumniValidation = [

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("graduationYear")
    .notEmpty()
    .withMessage("Graduation year is required.")
    .isInt({
      min: 1900,
      max: new Date().getFullYear(),
    })
    .withMessage("Invalid graduation year."),

  body("occupation")
    .trim()
    .notEmpty()
    .withMessage("Occupation is required."),

  body("company")
    .optional()
    .trim(),

  body("bio")
    .optional()
    .isString()
    .withMessage("Bio must be a string."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address."),

  body("linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL."),

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
| Update Alumni Validation
|--------------------------------------------------------------------------
*/

export const updateAlumniValidation = [

  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty."),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("graduationYear")
    .optional()
    .isInt({
      min: 1900,
      max: new Date().getFullYear(),
    })
    .withMessage("Invalid graduation year."),

  body("occupation")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Occupation cannot be empty."),

  body("company")
    .optional()
    .trim(),

  body("bio")
    .optional()
    .isString()
    .withMessage("Bio must be a string."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address."),

  body("linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL."),

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
