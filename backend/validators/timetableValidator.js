import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Timetable Validation
|--------------------------------------------------------------------------
*/

export const createTimetableValidation = [

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

  body("teacher")
    .notEmpty()
    .withMessage("Teacher is required.")
    .isMongoId()
    .withMessage("Teacher must be a valid ID."),

  body("classroom")
    .trim()
    .notEmpty()
    .withMessage("Classroom is required."),

  body("day")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage("Invalid day selected."),

  body("startTime")
    .trim()
    .notEmpty()
    .withMessage("Start time is required."),

  body("endTime")
    .trim()
    .notEmpty()
    .withMessage("End time is required."),

  body("academicSession")
    .trim()
    .notEmpty()
    .withMessage("Academic session is required."),

  body("term")
    .isIn([
      "First Term",
      "Second Term",
      "Third Term",
    ])
    .withMessage("Invalid term selected."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Timetable Validation
|--------------------------------------------------------------------------
*/

export const updateTimetableValidation = [

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

  body("teacher")
    .optional()
    .isMongoId()
    .withMessage("Teacher must be a valid ID."),

  body("classroom")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Classroom cannot be empty."),

  body("day")
    .optional()
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage("Invalid day selected."),

  body("startTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Start time cannot be empty."),

  body("endTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("End time cannot be empty."),

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
    ])
    .withMessage("Invalid term selected."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];
