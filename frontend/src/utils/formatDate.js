// ==========================================================
// src/utils/formatDate.js
// ----------------------------------------------------------
// Centralized date and time formatting utilities.
//
// These helpers ensure consistent date formatting across
// the entire application.
// ==========================================================

/* ==========================================================
   FULL DATE
   Example:
   July 17, 2026
========================================================== */

export const formatDate = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

/* ==========================================================
   SHORT DATE
   Example:
   17 Jul 2026
========================================================== */

export const formatShortDate = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    locale,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

/* ==========================================================
   DATE & TIME
   Example:
   July 17, 2026 • 3:45 PM
========================================================== */

export const formatDateTime = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleString(
    locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

/* ==========================================================
   TIME ONLY
   Example:
   3:45 PM
========================================================== */

export const formatTime = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString(
    locale,
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

/* ==========================================================
   DAY NAME
   Example:
   Monday
========================================================== */

export const getDayName = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    locale,
    {
      weekday: "long",
    }
  );
};

/* ==========================================================
   MONTH NAME
   Example:
   July
========================================================== */

export const getMonthName = (
  date,
  locale = "en-NG"
) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    locale,
    {
      month: "long",
    }
  );
};

/* ==========================================================
   RELATIVE TIME
   Example:
   Just now
   5 minutes ago
   3 hours ago
   2 days ago
========================================================== */

export const timeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);

  const seconds = Math.floor(
    (now - past) / 1000
  );

  if (seconds < 60)
    return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24)
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;

  const days = Math.floor(hours / 24);

  if (days < 30)
    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;

  const months = Math.floor(days / 30);

  if (months < 12)
    return `${months} month${
      months !== 1 ? "s" : ""
    } ago`;

  const years = Math.floor(months / 12);

  return `${years} year${
    years !== 1 ? "s" : ""
  } ago`;
};

/* ==========================================================
   IS TODAY
========================================================== */

export const isToday = (date) => {
  const today = new Date();
  const value = new Date(date);

  return (
    today.getDate() === value.getDate() &&
    today.getMonth() === value.getMonth() &&
    today.getFullYear() ===
      value.getFullYear()
  );
};

/* ==========================================================
   IS FUTURE DATE
========================================================== */

export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

/* ==========================================================
   YEARS BETWEEN
========================================================== */

export const yearsBetween = (
  start,
  end = new Date()
) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  let years =
    endDate.getFullYear() -
    startDate.getFullYear();

  const monthDifference =
    endDate.getMonth() -
    startDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      endDate.getDate() <
        startDate.getDate())
  ) {
    years--;
  }

  return years;
};




// import {
//   formatDate,
// } from "../utils/formatDate";
// <p>{formatDate(news.createdAt)}</p>


// import {
//   formatDateTime,
// } from "../utils/formatDate";
// <p>{formatDateTime(event.date)}</p>


// import {
//   timeAgo,
// } from "../utils/formatDate";
// <p>{timeAgo(activity.createdAt)}</p>


// import {
//   formatShortDate,
// } from "../utils/formatDate";
// <p>
//   Application Date:
//   {formatShortDate(application.createdAt)}
// </p>