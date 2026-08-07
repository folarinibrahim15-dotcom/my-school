import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Receipt Validation
|--------------------------------------------------------------------------
*/

export const createReceiptValidation = [

  body("receiptNumber")
    .trim()
    .notEmpty()
    .withMessage("Receipt number is required."),

  body("payment")
    .notEmpty()
    .withMessage("Payment is required.")
    .isMongoId()
    .withMessage("Invalid payment ID."),

  body("invoice")
    .notEmpty()
    .withMessage("Invoice is required.")
    .isMongoId()
    .withMessage("Invalid invoice ID."),

  body("student")
    .notEmpty()
    .withMessage("Student is required.")
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than zero."),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required."),

  body("paymentDate")
    .notEmpty()
    .withMessage("Payment date is required.")
    .isISO8601()
    .withMessage("Payment date must be a valid ISO date."),

  body("issuedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid issuedBy user ID."),

  body("remarks")
    .optional()
    .trim(),

  body("isPrinted")
    .optional()
    .isBoolean()
    .withMessage("isPrinted must be true or false."),

  body("isEmailed")
    .optional()
    .isBoolean()
    .withMessage("isEmailed must be true or false."),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Receipt Validation
|--------------------------------------------------------------------------
*/

export const updateReceiptValidation = [

  body("receiptNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Receipt number cannot be empty."),

  body("payment")
    .optional()
    .isMongoId()
    .withMessage("Invalid payment ID."),

  body("invoice")
    .optional()
    .isMongoId()
    .withMessage("Invalid invoice ID."),

  body("student")
    .optional()
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("amount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than zero."),

  body("paymentMethod")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Payment method cannot be empty."),

  body("paymentDate")
    .optional()
    .isISO8601()
    .withMessage("Payment date must be a valid ISO date."),

  body("issuedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid issuedBy user ID."),

  body("remarks")
    .optional()
    .trim(),

  body("isPrinted")
    .optional()
    .isBoolean()
    .withMessage("isPrinted must be true or false."),

  body("isEmailed")
    .optional()
    .isBoolean()
    .withMessage("isEmailed must be true or false."),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];
