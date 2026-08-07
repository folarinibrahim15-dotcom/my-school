// src/api/contactApi.js

/**
 * ==========================================================
 * CONTACT API
 * ----------------------------------------------------------
 * Handles all communication related to the Contact page.
 *
 * Current Status:
 * Placeholder implementation.
 *
 * Future:
 * Connect to Express + MongoDB backend.
 * ==========================================================
 */

import apiClient from "../services/apiClient";

/* ==========================================================
   SEND CONTACT MESSAGE
========================================================== */

export const sendContactMessage = async (messageData) => {
  return apiClient.post("/contact", messageData);
};

/* ==========================================================
   REQUEST A CALLBACK
========================================================== */

export const requestCallback = async (callbackData) => {
  return apiClient.post(
    "/contact/request-callback",
    callbackData
  );
};

/* ==========================================================
   BOOK A SCHOOL TOUR
========================================================== */

export const bookSchoolTour = async (tourData) => {
  return apiClient.post(
    "/contact/book-tour",
    tourData
  );
};

/* ==========================================================
   SUBSCRIBE TO NEWSLETTER
========================================================== */

export const subscribeNewsletter = async (email) => {
  return apiClient.post(
    "/newsletter/subscribe",
    { email }
  );
};

/* ==========================================================
   UNSUBSCRIBE FROM NEWSLETTER
========================================================== */

export const unsubscribeNewsletter = async (email) => {
  return apiClient.post(
    "/newsletter/unsubscribe",
    { email }
  );
};

/* ==========================================================
   SEND GENERAL ENQUIRY
========================================================== */

export const sendGeneralEnquiry = async (enquiryData) => {
  return apiClient.post(
    "/contact/enquiry",
    enquiryData
  );
};

/* ==========================================================
   GET SCHOOL CONTACT INFORMATION
========================================================== */

export const getContactInformation = async () => {
  return apiClient.get("/contact/info");
};

/* ==========================================================
   GET SCHOOL LOCATIONS
========================================================== */

export const getSchoolLocations = async () => {
  return apiClient.get("/contact/locations");
};


// import { sendContactMessage } from "../api/contactApi";

// await sendContactMessage({
//   fullName,
//   email,
//   phone,
//   subject,
//   message,
// });


// import { subscribeNewsletter } from "../api/contactApi";

// await subscribeNewsletter(email);

// import { bookSchoolTour } from "../api/contactApi";

// await bookSchoolTour({
//   parentName,
//   phone,
//   email,
//   preferredDate,
// });

// import { requestCallback } from "../api/contactApi";

// await requestCallback({
//   name,
//   phone,
//   preferredTime,
// });



// POST   /api/contact
// POST   /api/contact/request-callback
// POST   /api/contact/book-tour
// POST   /api/contact/enquiry

// GET    /api/contact/info
// GET    /api/contact/locations

// POST   /api/newsletter/subscribe
// POST   /api/newsletter/unsubscribe