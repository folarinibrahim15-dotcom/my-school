import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Testimonial Validation
|--------------------------------------------------------------------------
*/

export const createTestimonialValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("role")
    .optional()
    .isIn([
      "Student",
      "Parent",
      "Alumni",
      "Teacher",
      "Staff",
      "Guardian",
      "Other",
    ])
    .withMessage("Invalid role."),

  body("title")
    .optional()
    .trim(),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Testimonial message is required."),

  body("rating")
    .optional()
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage("Rating must be between 1 and 5."),

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
| Update Testimonial Validation
|--------------------------------------------------------------------------
*/

export const updateTestimonialValidation = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty."),

  body("role")
    .optional()
    .isIn([
      "Student",
      "Parent",
      "Alumni",
      "Teacher",
      "Staff",
      "Guardian",
      "Other",
    ])
    .withMessage("Invalid role."),

  body("title")
    .optional()
    .trim(),

  body("message")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty."),

  body("rating")
    .optional()
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage("Rating must be between 1 and 5."),

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
