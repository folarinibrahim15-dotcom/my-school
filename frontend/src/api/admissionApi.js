// src/api/admissionApi.js

/**
 * ==========================================================
 * ADMISSION API
 * ----------------------------------------------------------
 * This file contains every frontend function related to
 * the admission process.
 *
 * Currently they are placeholders.
 *
 * Later they will communicate with your Express backend.
 * ==========================================================
 */

import apiClient from "../services/apiClient";

/* ==========================================================
   Submit Admission Application
========================================================== */

export const submitAdmission = async (formData) => {
  return apiClient.post("/admissions", formData);
};

/* ==========================================================
   Save Draft
========================================================== */

export const saveAdmissionDraft = async (formData) => {
  return apiClient.post("/admissions/draft", formData);
};

/* ==========================================================
   Upload Passport
========================================================== */

export const uploadPassport = async (file) => {
  return apiClient.post("/admissions/upload/passport", file);
};

/* ==========================================================
   Upload Supporting Documents
========================================================== */

export const uploadDocuments = async (documents) => {
  return apiClient.post("/admissions/upload/documents", documents);
};

/* ==========================================================
   Initialize Paystack Payment
========================================================== */

export const initializePayment = async (paymentData) => {
  return apiClient.post("/payments/initialize", paymentData);
};

/* ==========================================================
   Verify Payment
========================================================== */

export const verifyPayment = async (reference) => {
  return apiClient.get(`/payments/verify/${reference}`);
};

/* ==========================================================
   Get Admission Status
========================================================== */

export const getAdmissionStatus = async (
  applicationNumber
) => {
  return apiClient.get(
    `/admissions/status/${applicationNumber}`
  );
};

/* ==========================================================
   Get Single Application
========================================================== */

export const getAdmission = async (id) => {
  return apiClient.get(`/admissions/${id}`);
};

/* ==========================================================
   Update Admission
========================================================== */

export const updateAdmission = async (
  id,
  formData
) => {
  return apiClient.put(
    `/admissions/${id}`,
    formData
  );
};

/* ==========================================================
   Delete Admission
========================================================== */

export const deleteAdmission = async (id) => {
  return apiClient.delete(
    `/admissions/${id}`
  );
};

// import {
//   submitAdmission,
// } from "../../api/admissionApi";

// const response = await submitAdmission(formData);



// import {
//   initializePayment,
// } from "../../api/admissionApi";

// const payment = await initializePayment({
//   email: formData.parentEmail,
//   amount: 15000,
// });