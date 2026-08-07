// ==========================================================
// src/utils/helpers.js
// ----------------------------------------------------------
// General helper functions used throughout the application.
// ==========================================================

/* ==========================================================
   FORMAT CURRENCY
========================================================== */

export const formatCurrency = (
  amount,
  currency = "NGN",
  locale = "en-NG"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

/* ==========================================================
   FORMAT NUMBER
========================================================== */

export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

/* ==========================================================
   CAPITALIZE FIRST LETTER
========================================================== */

export const capitalize = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/* ==========================================================
   CAPITALIZE EACH WORD
========================================================== */

export const titleCase = (text = "") => {
  return text
    .toLowerCase()
    .split(" ")
    .map(capitalize)
    .join(" ");
};

/* ==========================================================
   GENERATE SLUG
========================================================== */

export const slugify = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

/* ==========================================================
   TRUNCATE TEXT
========================================================== */

export const truncate = (
  text = "",
  length = 100
) => {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

/* ==========================================================
   RANDOM STRING
========================================================== */

export const randomString = (
  length = 8
) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
};

/* ==========================================================
   PAYMENT REFERENCE
========================================================== */

export const generateReference = () => {
  return (
    "SPIS-" +
    Date.now() +
    "-" +
    randomString(6)
  );
};

/* ==========================================================
   SCROLL TO TOP
========================================================== */

export const scrollToTop = (
  behavior = "smooth"
) => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

/* ==========================================================
   SCROLL TO ELEMENT
========================================================== */

export const scrollToElement = (
  id,
  behavior = "smooth"
) => {
  const element =
    document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior,
      block: "start",
    });
  }
};

/* ==========================================================
   COPY TO CLIPBOARD
========================================================== */

export const copyToClipboard = async (
  text
) => {
  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    return false;
  }
};

/* ==========================================================
   DEBOUNCE
========================================================== */

export const debounce = (
  callback,
  delay = 500
) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/* ==========================================================
   IS EMPTY OBJECT
========================================================== */

export const isEmptyObject = (
  object
) => {
  return (
    object &&
    Object.keys(object).length === 0
  );
};

/* ==========================================================
   REMOVE EMPTY FIELDS
========================================================== */

export const removeEmptyFields = (
  object
) => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
};

/* ==========================================================
   DOWNLOAD FILE
========================================================== */

export const downloadFile = (
  url,
  filename
) => {
  const link =
    document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

/* ==========================================================
   OPEN EXTERNAL LINK
========================================================== */

export const openExternal = (
  url
) => {
  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
};

/* ==========================================================
   GET INITIALS
========================================================== */

export const getInitials = (
  name = ""
) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

/* ==========================================================
   RANDOM COLOR
========================================================== */

export const randomColor = () => {
  const colors = [
    "#0B3D91",
    "#FFD700",
    "#16A34A",
    "#EF4444",
    "#2563EB",
    "#9333EA",
    "#F97316",
  ];

  return colors[
    Math.floor(Math.random() * colors.length)
  ];
};



// import { formatCurrency } from "../utils/helpers";
// formatCurrency(15000);

// // ₦15,000

// import { generateReference } from "../utils/helpers";
// const reference = generateReference();

// // SPIS-1752769234567-A8KD2Q

// import { scrollToTop } from "../utils/helpers";
// scrollToTop();

// import { slugify } from "../utils/helpers";
// slugify("Admission Form 2026 Opens");
// // admission-form-2026-opens

// import { copyToClipboard } from "../utils/helpers";
// await copyToClipboard(admissionNumber);