import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Event Validation
|--------------------------------------------------------------------------
*/

export const createEventValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required."),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("category")
    .optional()
    .isIn([
      "Academic",
      "Sports",
      "Competition",
      "Seminar",
      "Workshop",
      "Graduation",
      "Cultural",
      "Religious",
      "General",
    ])
    .withMessage("Invalid event category."),

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required.")
    .isISO8601()
    .withMessage("Event date must be a valid date."),

  body("registrationDeadline")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Registration deadline must be a valid date."),

  body("venue")
    .trim()
    .notEmpty()
    .withMessage("Venue is required."),

  body("organizer")
    .optional()
    .trim(),

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
| Update Event Validation
|--------------------------------------------------------------------------
*/

export const updateEventValidation = [

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Event title cannot be empty."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty."),

  body("category")
    .optional()
    .isIn([
      "Academic",
      "Sports",
      "Competition",
      "Seminar",
      "Workshop",
      "Graduation",
      "Cultural",
      "Religious",
      "General",
    ])
    .withMessage("Invalid event category."),

  body("eventDate")
    .optional()
    .isISO8601()
    .withMessage("Event date must be a valid date."),

  body("registrationDeadline")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Registration deadline must be a valid date."),

  body("venue")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Venue cannot be empty."),

  body("organizer")
    .optional()
    .trim(),

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
