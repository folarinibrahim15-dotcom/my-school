import { body } from "express-validator";

export const createStudentValidation = [

  body("firstName")
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required"),

  body("class")
    .notEmpty()
    .withMessage("Class is required"),

  body("session")
    .notEmpty()
    .withMessage("Session is required"),

  body("address")
    .notEmpty()
    .withMessage("Address is required"),

];