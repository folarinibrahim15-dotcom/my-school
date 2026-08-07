// ==========================================================
// src/services/storage.js
// ----------------------------------------------------------
// Centralized Storage Service
//
// Handles Local Storage and Session Storage.
//
// Never access localStorage directly inside components.
// Always use this service.
// ==========================================================

/* ==========================================================
   LOCAL STORAGE
========================================================== */

export const storage = {
  /* ===============================
     Save Item
  =============================== */

  set(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error(
        "Storage Error:",
        error
      );

      return false;
    }
  },

  /* ===============================
     Get Item
  =============================== */

  get(key) {
    try {
      const item =
        localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : null;
    } catch (error) {
      console.error(
        "Storage Error:",
        error
      );

      return null;
    }
  },

  /* ===============================
     Remove Item
  =============================== */

  remove(key) {
    localStorage.removeItem(key);
  },

  /* ===============================
     Clear Storage
  =============================== */

  clear() {
    localStorage.clear();
  },

  /* ===============================
     Has Item
  =============================== */

  has(key) {
    return (
      localStorage.getItem(key) !==
      null
    );
  },
};

/* ==========================================================
   SESSION STORAGE
========================================================== */

export const session = {
  set(key, value) {
    try {
      sessionStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  },

  get(key) {
    try {
      const item =
        sessionStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : null;
    } catch {
      return null;
    }
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};

/* ==========================================================
   TOKEN HELPERS
========================================================== */

export const tokenStorage = {
  save(token) {
    storage.set("spis_token", token);
  },

  get() {
    return storage.get("spis_token");
  },

  remove() {
    storage.remove("spis_token");
  },
};

/* ==========================================================
   USER HELPERS
========================================================== */

export const userStorage = {
  save(user) {
    storage.set("spis_user", user);
  },

  get() {
    return storage.get("spis_user");
  },

  remove() {
    storage.remove("spis_user");
  },
};

/* ==========================================================
   ADMISSION DRAFT
========================================================== */

export const admissionDraftStorage = {
  save(data) {
    storage.set(
      "spis_admission_draft",
      data
    );
  },

  get() {
    return storage.get(
      "spis_admission_draft"
    );
  },

  clear() {
    storage.remove(
      "spis_admission_draft"
    );
  },
};

/* ==========================================================
   SEARCH HISTORY
========================================================== */

export const searchStorage = {
  save(history) {
    storage.set(
      "spis_search_history",
      history
    );
  },

  get() {
    return (
      storage.get(
        "spis_search_history"
      ) || []
    );
  },

  clear() {
    storage.remove(
      "spis_search_history"
    );
  },
};

/* ==========================================================
   THEME
========================================================== */

export const themeStorage = {
  save(theme) {
    storage.set("spis_theme", theme);
  },

  get() {
    return (
      storage.get("spis_theme") ||
      "light"
    );
  },
};

/* ==========================================================
   REMEMBER ME
========================================================== */

export const rememberMeStorage = {
  save(value) {
    storage.set(
      "spis_remember_me",
      value
    );
  },

  get() {
    return (
      storage.get(
        "spis_remember_me"
      ) || false
    );
  },
};



// import { tokenStorage } from "../services/storage";
// tokenStorage.save(token);

// const token = tokenStorage.get();


// import { userStorage } from "../services/storage";
// userStorage.save(user);


// import { admissionDraftStorage } from "../services/storage";
// admissionDraftStorage.save(formData);


// const draft = admissionDraftStorage.get();


// import { searchStorage } from "../services/storage";

// searchStorage.save(results);