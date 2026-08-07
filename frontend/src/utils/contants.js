// ==========================================================
// src/utils/constants.js
// ----------------------------------------------------------
// Global constants used throughout the application.
//
// This file centralizes values that rarely change,
// making the project easier to maintain.
// ==========================================================

/* ==========================================================
   SCHOOL INFORMATION
========================================================== */

export const SCHOOL = {
  name: "Sound Peace International Secondary Schools",

  shortName: "Sound Peace",

  slogan: "Inspiring Excellence, Building Character.",

  email: "info@soundpeace.edu.ng",

  phone: "+234 XXX XXX XXXX",

  whatsapp: "+234 XXX XXX XXXX",

  website: "https://www.soundpeace.edu.ng",

  address:
    "Ibadan, Oyo State, Nigeria",
};

/* ==========================================================
   BRAND COLORS
========================================================== */

export const COLORS = {
  primary: "#0B3D91",

  secondary: "#FFD700",

  success: "#16A34A",

  danger: "#DC2626",

  warning: "#F59E0B",

  white: "#FFFFFF",

  black: "#000000",

  lightGray: "#F3F4F6",

  gray: "#6B7280",
};

/* ==========================================================
   ADMISSION
========================================================== */

export const ADMISSION = {
  applicationFee: 15000,

  currency: "NGN",

  session: "2026/2027",

  minimumAge: 10,
};

/* ==========================================================
   ADMISSION CLASSES
========================================================== */

export const ADMISSION_CLASSES = [
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS 1",
  "SS 2",
];

/* ==========================================================
   GENDERS
========================================================== */

export const GENDERS = [
  "Male",
  "Female",
];

/* ==========================================================
   RELIGIONS
========================================================== */

export const RELIGIONS = [
  "Islam",
  "Christianity",
  "Others",
];

/* ==========================================================
   BLOOD GROUPS
========================================================== */

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

/* ==========================================================
   GENOTYPES
========================================================== */

export const GENOTYPES = [
  "AA",
  "AS",
  "SS",
  "AC",
  "SC",
];

/* ==========================================================
   PAYMENT
========================================================== */

export const PAYMENT = {
  provider: "Paystack",

  currency: "NGN",

  admissionFee: 15000,
};

/* ==========================================================
   SOCIAL LINKS
========================================================== */

export const SOCIALS = {
  facebook: "",

  instagram: "",

  twitter: "",

  youtube: "",

  linkedin: "",
};

/* ==========================================================
   ROUTES
========================================================== */

export const ROUTES = {
  HOME: "/",

  ABOUT: "/about",

  ADMISSION: "/admissions",

  APPLY: "/apply-online",

  NEWS: "/news",

  GALLERY: "/gallery",

  TESTIMONIALS: "/testimonials",

  CONTACT: "/contact",

  LOGIN: "/login",

  DASHBOARD: "/dashboard",
};

/* ==========================================================
   LOCAL STORAGE KEYS
========================================================== */

export const STORAGE_KEYS = {
  TOKEN: "spis_token",

  USER: "spis_user",

  THEME: "spis_theme",

  ADMISSION_DRAFT: "spis_admission_draft",
};

/* ==========================================================
   FILE UPLOAD
========================================================== */

export const FILE_UPLOAD = {
  maxImageSize: 2 * 1024 * 1024,

  maxDocumentSize: 5 * 1024 * 1024,

  allowedImages: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],

  allowedDocuments: [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ],
};

/* ==========================================================
   API ENDPOINTS
========================================================== */

export const API_ENDPOINTS = {
  AUTH: "/auth",

  ADMISSION: "/admissions",

  CONTACT: "/contact",

  NEWS: "/news",

  GALLERY: "/gallery",

  PAYMENTS: "/payments",
};