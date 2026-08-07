import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Shared Enums
|--------------------------------------------------------------------------
*/

const terms = [
  "First Term",
  "Second Term",
  "Third Term",
];

const classLevels = [
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS 1",
  "SS 2",
  "SS 3",
];

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const feeField = (field, label) =>
  body(field)
    .optional()
    .isFloat({ min: 0 })
    .withMessage(`${label} must be zero or greater.`);

/*
|--------------------------------------------------------------------------
| Create Fee Structure Validation
|--------------------------------------------------------------------------
*/

export const createFeeStructureValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("academicSession")
    .trim()
    .notEmpty()
    .withMessage("Academic session is required."),

  body("term")
    .notEmpty()
    .withMessage("Term is required.")
    .isIn(terms)
    .withMessage("Invalid term."),

  body("classLevel")
    .notEmpty()
    .withMessage("Class level is required.")
    .isIn(classLevels)
    .withMessage("Invalid class level."),

  feeField("tuitionFee", "Tuition fee"),
  feeField("developmentFee", "Development fee"),
  feeField("examinationFee", "Examination fee"),
  feeField("sportsFee", "Sports fee"),
  feeField("libraryFee", "Library fee"),
  feeField("laboratoryFee", "Laboratory fee"),
  feeField("boardingFee", "Boarding fee"),
  feeField("transportFee", "Transport fee"),
  feeField("miscellaneousFee", "Miscellaneous fee"),

  body("paymentDeadline")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Payment deadline must be a valid date."),

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
| Update Fee Structure Validation
|--------------------------------------------------------------------------
*/

export const updateFeeStructureValidation = [

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty."),

  body("academicSession")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Academic session cannot be empty."),

  body("term")
    .optional()
    .isIn(terms)
    .withMessage("Invalid term."),

  body("classLevel")
    .optional()
    .isIn(classLevels)
    .withMessage("Invalid class level."),

  feeField("tuitionFee", "Tuition fee"),
  feeField("developmentFee", "Development fee"),
  feeField("examinationFee", "Examination fee"),
  feeField("sportsFee", "Sports fee"),
  feeField("libraryFee", "Library fee"),
  feeField("laboratoryFee", "Laboratory fee"),
  feeField("boardingFee", "Boarding fee"),
  feeField("transportFee", "Transport fee"),
  feeField("miscellaneousFee", "Miscellaneous fee"),

  body("paymentDeadline")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Payment deadline must be a valid date."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];
