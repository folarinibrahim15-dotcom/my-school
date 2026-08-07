import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create User Validation
|--------------------------------------------------------------------------
*/

export const createUserValidation = [

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters."),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("role")
    .isIn([
      "admin",
      "teacher",
      "student",
      "parent",
    ])
    .withMessage("Invalid user role."),

];

/*
|--------------------------------------------------------------------------
| Update User Validation
|--------------------------------------------------------------------------
*/

export const updateUserValidation = [

  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters."),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters."),

  body("email")
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address."),

  body("phoneNumber")
    .optional()
    .trim(),

  body("avatar")
    .optional()
    .trim(),

];

/*
|--------------------------------------------------------------------------
| Update User Role Validation
|--------------------------------------------------------------------------
*/

export const updateRoleValidation = [

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn([
      "admin",
      "teacher",
      "student",
      "parent",
    ])
    .withMessage("Invalid role."),

];

/*
|--------------------------------------------------------------------------
| Update User Status Validation
|--------------------------------------------------------------------------
*/

export const updateStatusValidation = [

  body("isActive")
    .isBoolean()
    .withMessage("isActive must be true or false."),

];