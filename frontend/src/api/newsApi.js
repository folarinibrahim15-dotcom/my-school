// src/api/newsApi.js

/**
 * ==========================================================
 * NEWS API
 * ----------------------------------------------------------
 * Handles all News & Events related API requests.
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
   GET ALL NEWS
========================================================== */

export const getAllNews = async () => {
  return apiClient.get("/news");
};

/* ==========================================================
   GET FEATURED NEWS
========================================================== */

export const getFeaturedNews = async () => {
  return apiClient.get("/news/featured");
};

/* ==========================================================
   GET LATEST NEWS
========================================================== */

export const getLatestNews = async () => {
  return apiClient.get("/news/latest");
};

/* ==========================================================
   GET SINGLE NEWS ARTICLE
========================================================== */

export const getNewsBySlug = async (slug) => {
  return apiClient.get(`/news/${slug}`);
};

/* ==========================================================
   GET NEWS BY CATEGORY
========================================================== */

export const getNewsByCategory = async (category) => {
  return apiClient.get(
    `/news/category/${category}`
  );
};

/* ==========================================================
   SEARCH NEWS
========================================================== */

export const searchNews = async (keyword) => {
  return apiClient.get(
    `/news/search/${keyword}`
  );
};

/* ==========================================================
   GET UPCOMING EVENTS
========================================================== */

export const getUpcomingEvents = async () => {
  return apiClient.get("/events/upcoming");
};

/* ==========================================================
   GET SINGLE EVENT
========================================================== */

export const getEventById = async (id) => {
  return apiClient.get(`/events/${id}`);
};

/* ==========================================================
   REGISTER FOR EVENT
========================================================== */

export const registerForEvent = async (
  id,
  attendeeData
) => {
  return apiClient.post(
    `/events/${id}/register`,
    attendeeData
  );
};

/* ==========================================================
   GET NEWS CATEGORIES
========================================================== */

export const getNewsCategories = async () => {
  return apiClient.get("/news/categories");
};


// import { getLatestNews } from "../api/newsApi";

// const latestNews = await getLatestNews();

// import { getAllNews } from "../api/newsApi";

// const news = await getAllNews();

// import { getNewsBySlug } from "../api/newsApi";

// const article = await getNewsBySlug(slug);

// import { searchNews } from "../api/newsApi";

// const results = await searchNews("Admission");


// GET    /api/news
// GET    /api/news/latest
// GET    /api/news/featured
// GET    /api/news/categories

// GET    /api/news/:slug
// GET    /api/news/category/:category
// GET    /api/news/search/:keyword

// GET    /api/events/upcoming
// GET    /api/events/:id
// POST   /api/events/:id/register