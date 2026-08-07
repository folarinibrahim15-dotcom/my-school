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

/*
|--------------------------------------------------------------------------
| Create Student Invoice Validation
|--------------------------------------------------------------------------
*/

export const createStudentInvoiceValidation = [

  body("student")
    .notEmpty()
    .withMessage("Student is required.")
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("feeStructure")
    .notEmpty()
    .withMessage("Fee structure is required.")
    .isMongoId()
    .withMessage("Invalid fee structure ID."),

  body("invoiceNumber")
    .trim()
    .notEmpty()
    .withMessage("Invoice number is required."),

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
    .trim()
    .notEmpty()
    .withMessage("Class level is required."),

  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be zero or greater."),

  body("amountPaid")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount paid must be zero or greater."),

  body("dueDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Due date must be a valid date."),

  body("remarks")
    .optional()
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Student Invoice Validation
|--------------------------------------------------------------------------
*/

export const updateStudentInvoiceValidation = [

  body("student")
    .optional()
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("feeStructure")
    .optional()
    .isMongoId()
    .withMessage("Invalid fee structure ID."),

  body("invoiceNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Invoice number cannot be empty."),

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
    .trim()
    .notEmpty()
    .withMessage("Class level cannot be empty."),

  body("totalAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total amount must be zero or greater."),

  body("amountPaid")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount paid must be zero or greater."),

  body("dueDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Due date must be a valid date."),

  body("remarks")
    .optional()
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];
