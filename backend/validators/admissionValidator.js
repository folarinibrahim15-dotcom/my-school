import { body } from "express-validator";

export const createAdmissionValidation = [
  // Student's name
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "First name must be between 2 and 50 characters."
    ),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Last name must be between 2 and 50 characters."
    ),

  body("middleName")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 50 })
    .withMessage(
      "Middle name must not exceed 50 characters."
    ),

  // Student information
  body("gender")
    .trim()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("dateOfBirth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth is required.")
    .bail()
    .isISO8601()
    .withMessage("Enter a valid date of birth.")
    .bail()
    .custom((value) => {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Enter a valid date of birth.");
      }

      if (date >= new Date()) {
        throw new Error(
          "Date of birth must be in the past."
        );
      }

      return true;
    }),

  body("hometown")
    .trim()
    .notEmpty()
    .withMessage("Home town is required."),

  body("lga")
    .trim()
    .notEmpty()
    .withMessage("Local Government Area is required."),

  body("stateOfOrigin")
    .trim()
    .notEmpty()
    .withMessage("State of origin is required."),

  body("religion")
    .optional({ values: "falsy" })
    .trim(),

  body("denomination")
    .optional({ values: "falsy" })
    .trim(),

  // Previous school
  body("previousSchool")
    .trim()
    .notEmpty()
    .withMessage(
      "Present or last school is required."
    ),

  body("previousSchoolAddress")
    .trim()
    .notEmpty()
    .withMessage(
      "Previous school address is required."
    ),

  body("reasonForLeaving")
    .trim()
    .notEmpty()
    .withMessage(
      "Reason for leaving the previous school is required."
    ),

  // Admission class
  body("classApplyingFor")
    .trim()
    .notEmpty()
    .withMessage(
      "Class applying for is required."
    ),

  // Health and family information
  body("allergies")
    .trim()
    .isIn(["Yes", "No"])
    .withMessage(
      "Please indicate whether the student has allergies or a health condition."
    ),

  body("childrenEnrolled")
    .trim()
    .isIn(["Yes", "No"])
    .withMessage(
      "Please indicate whether the family has children enrolled in the school."
    ),

  // Parent / guardian
  body("parentName")
    .trim()
    .notEmpty()
    .withMessage(
      "Parent/Guardian name is required."
    ),

  body("parentEmail")
    .trim()
    .notEmpty()
    .withMessage(
      "Parent email address is required."
    )
    .bail()
    .isEmail()
    .withMessage(
      "A valid parent email address is required."
    )
    .normalizeEmail(),

  body("parentPhone")
    .trim()
    .notEmpty()
    .withMessage(
      "Parent phone number is required."
    ),

  // Document choices arrive as JSON in multipart FormData.
  body("documentOptions")
    .notEmpty()
    .withMessage(
      "Please select at least one document option."
    )
    .bail()
    .custom((value) => {
      let options;

      try {
        options =
          typeof value === "string"
            ? JSON.parse(value)
            : value;
      } catch {
        throw new Error(
          "Document options must be valid."
        );
      }

      if (!Array.isArray(options) || options.length === 0) {
        throw new Error(
          "Please select at least one document option."
        );
      }

      const allowedOptions = [
        "testimonial",
        "results",
        "emailLater",
      ];

      const valid = options.every((option) =>
        allowedOptions.includes(option)
      );

      if (!valid) {
        throw new Error(
          "One or more document options are invalid."
        );
      }

      return true;
    }),
];