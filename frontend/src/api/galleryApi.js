// src/api/galleryApi.js

/**
 * ==========================================================
 * GALLERY API
 * ----------------------------------------------------------
 * Handles all Gallery, Photos, Videos and Media requests.
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
   GET ALL GALLERY ITEMS
========================================================== */

export const getGallery = async () => {
  return apiClient.get("/gallery");
};

/* ==========================================================
   GET FEATURED GALLERY
========================================================== */

export const getFeaturedGallery = async () => {
  return apiClient.get("/gallery/featured");
};

/* ==========================================================
   GET SINGLE GALLERY ITEM
========================================================== */

export const getGalleryItem = async (id) => {
  return apiClient.get(`/gallery/${id}`);
};

/* ==========================================================
   GET GALLERY BY CATEGORY
========================================================== */

export const getGalleryByCategory = async (
  category
) => {
  return apiClient.get(
    `/gallery/category/${category}`
  );
};

/* ==========================================================
   SEARCH GALLERY
========================================================== */

export const searchGallery = async (
  keyword
) => {
  return apiClient.get(
    `/gallery/search/${keyword}`
  );
};

/* ==========================================================
   GET PHOTO ALBUMS
========================================================== */

export const getPhotoAlbums = async () => {
  return apiClient.get("/gallery/albums");
};

/* ==========================================================
   GET SINGLE PHOTO ALBUM
========================================================== */

export const getPhotoAlbum = async (id) => {
  return apiClient.get(
    `/gallery/albums/${id}`
  );
};

/* ==========================================================
   GET VIDEOS
========================================================== */

export const getVideos = async () => {
  return apiClient.get("/gallery/videos");
};

/* ==========================================================
   GET SINGLE VIDEO
========================================================== */

export const getVideo = async (id) => {
  return apiClient.get(`/gallery/videos/${id}`);
};

/* ==========================================================
   GET VIRTUAL TOUR
========================================================== */

export const getVirtualTour = async () => {
  return apiClient.get("/gallery/virtual-tour");
};





// import { getFeaturedGallery } from "../api/galleryApi";
// const gallery = await getFeaturedGallery();


// import { getGallery } from "../api/galleryApi";
// const gallery = await getGallery();


// import { getGalleryByCategory } from "../api/galleryApi";
// const sports = await getGalleryByCategory("Sports");


// import { getVideos } from "../api/galleryApi";
// const videos = await getVideos();


// import { getVirtualTour } from "../api/galleryApi";
// const tour = await getVirtualTour();

// GET    /api/gallery
// GET    /api/gallery/featured
// GET    /api/gallery/:id

// GET    /api/gallery/category/:category
// GET    /api/gallery/search/:keyword

// GET    /api/gallery/albums
// GET    /api/gallery/albums/:id

// GET    /api/gallery/videos
// GET    /api/gallery/videos/:id

// GET    /api/gallery/virtual-tour