// src/services/apiClient.js

/**
 * ==========================================================
 * API CLIENT
 * ----------------------------------------------------------
 * Central place for communicating with the backend.
 *
 * Currently this is a placeholder.
 * Later it will use Axios and your Express API.
 * ==========================================================
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/**
 * Generic request helper
 */
const request = async (
  endpoint,
  options = {}
) => {
  console.log(
    `API Request → ${API_BASE_URL}${endpoint}`
  );

  console.log(options);

  // Placeholder response
  return {
    success: true,
    message: "Frontend placeholder response",
    data: null,
  };
};

/**
 * GET
 */
const get = (endpoint) =>
  request(endpoint, {
    method: "GET",
  });

/**
 * POST
 */
const post = (endpoint, body) =>
  request(endpoint, {
    method: "POST",
    body,
  });

/**
 * PUT
 */
const put = (endpoint, body) =>
  request(endpoint, {
    method: "PUT",
    body,
  });

/**
 * DELETE
 */
const remove = (endpoint) =>
  request(endpoint, {
    method: "DELETE",
  });

const apiClient = {
  get,
  post,
  put,
  delete: remove,
};

export default apiClient;

// import apiClient from "../services/apiClient";

// const response = await apiClient.post(
//   "/admissions",
//   formData
// );

// console.log(response);

// {
//   success: true,
//   message: "Frontend placeholder response",
//   data: null
// }