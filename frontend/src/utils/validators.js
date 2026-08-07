// ==========================================================
// src/utils/validators.js
// ----------------------------------------------------------
// Centralized validation utilities.
//
// Every form in the application should import validation
// functions from here instead of writing validation logic
// inside React components.
// ==========================================================

/* ==========================================================
   REQUIRED FIELD
========================================================== */

export const isRequired = (value) => {
  return value !== undefined &&
    value !== null &&
    String(value).trim() !== "";
};

/* ==========================================================
   EMAIL
========================================================== */

export const isValidEmail = (email) => {
  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
};

/* ==========================================================
   PHONE NUMBER
========================================================== */

export const isValidPhone = (phone) => {
  const pattern =
    /^[0-9+\-()\s]{7,20}$/;

  return pattern.test(phone);
};

/* ==========================================================
   PASSWORD
========================================================== */

export const isStrongPassword = (password) => {
  if (!password) return false;

  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

/* ==========================================================
   URL
========================================================== */

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/* ==========================================================
   DATE
========================================================== */

export const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

/* ==========================================================
   FILE SIZE
========================================================== */

export const isValidFileSize = (
  file,
  maxSize
) => {
  if (!file) return false;

  return file.size <= maxSize;
};

/* ==========================================================
   FILE TYPE
========================================================== */

export const isValidFileType = (
  file,
  allowedTypes
) => {
  if (!file) return false;

  return allowedTypes.includes(file.type);
};

/* ==========================================================
   NAME
========================================================== */

export const isValidName = (name) => {
  const pattern =
    /^[A-Za-zÀ-ÿ' -]{2,50}$/;

  return pattern.test(name);
};

/* ==========================================================
   AGE
========================================================== */

export const isMinimumAge = (
  birthDate,
  minimumAge
) => {
  const dob = new Date(birthDate);

  const today = new Date();

  let age =
    today.getFullYear() -
    dob.getFullYear();

  const month =
    today.getMonth() -
    dob.getMonth();

  if (
    month < 0 ||
    (month === 0 &&
      today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age >= minimumAge;
};

/* ==========================================================
   ADMISSION FORM
========================================================== */

export const validateAdmissionForm = (
  data
) => {
  const errors = {};

  if (!isRequired(data.firstName)) {
    errors.firstName =
      "First name is required.";
  }

  if (!isRequired(data.lastName)) {
    errors.lastName =
      "Last name is required.";
  }

  if (
    data.parentEmail &&
    !isValidEmail(data.parentEmail)
  ) {
    errors.parentEmail =
      "Enter a valid email address.";
  }

  if (
    data.parentPhone &&
    !isValidPhone(data.parentPhone)
  ) {
    errors.parentPhone =
      "Enter a valid phone number.";
  }

  return errors;
};

/* ==========================================================
   LOGIN FORM
========================================================== */

export const validateLogin = (
  data
) => {
  const errors = {};

  if (!isValidEmail(data.email)) {
    errors.email =
      "Invalid email address.";
  }

  if (!isRequired(data.password)) {
    errors.password =
      "Password is required.";
  }

  return errors;
};

/* ==========================================================
   REGISTER FORM
========================================================== */

export const validateRegister = (
  data
) => {
  const errors = {};

  if (!isRequired(data.fullName)) {
    errors.fullName =
      "Full name is required.";
  }

  if (!isValidEmail(data.email)) {
    errors.email =
      "Invalid email.";
  }

  if (
    !isStrongPassword(data.password)
  ) {
    errors.password =
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.";
  }

  return errors;
};

/* ==========================================================
   CONTACT FORM
========================================================== */

export const validateContactForm = (
  data
) => {
  const errors = {};

  if (!isRequired(data.name)) {
    errors.name =
      "Name is required.";
  }

  if (!isValidEmail(data.email)) {
    errors.email =
      "Email is invalid.";
  }

  if (!isRequired(data.message)) {
    errors.message =
      "Message is required.";
  }

  return errors;
};




// import { validateAdmissionForm } from "../utils/validators";
// const errors = validateAdmissionForm(formData);

// if (Object.keys(errors).length > 0) {
//   setErrors(errors);
//   return;
// }


// import { validateLogin } from "../utils/validators";
// const errors = validateLogin(loginData);


// import { validateContactForm } from "../utils/validators";
// const errors = validateContactForm(contactData);