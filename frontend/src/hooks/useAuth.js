// // ==========================================================
// // src/hooks/useAuth.js
// // ----------------------------------------------------------
// // Authentication Hook
// //
// // Centralizes:
// // - Login
// // - Logout
// // - Current User
// // - Authentication State
// // - Loading State
// //
// // Future:
// // Connects directly to authApi.js
// // ==========================================================

// import { useEffect, useState } from "react";

// import {
//   loginUser,
//   logoutUser,
//   getCurrentUser,
// } from "../api/authApi";

// import {
//   tokenStorage,
//   userStorage,
// } from "../services/storage";

// export default function useAuth() {
//   const [user, setUser] = useState(
//     userStorage.get()
//   );

//   const [loading, setLoading] =
//     useState(false);

//   const [authenticated, setAuthenticated] =
//     useState(!!tokenStorage.get());

//   /* ======================================================
//       LOGIN
//   ====================================================== */

//   const login = async (credentials) => {
//     try {
//       setLoading(true);

//       const response =
//         await loginUser(credentials);

//       tokenStorage.save(response.token);

//       userStorage.save(response.user);

//       setUser(response.user);

//       setAuthenticated(true);

//       return {
//         success: true,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error:
//           error.message ||
//           "Unable to login.",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================================================
//       LOGOUT
//   ====================================================== */

//   const logout = async () => {
//     try {
//       setLoading(true);

//       await logoutUser();

//       tokenStorage.remove();

//       userStorage.remove();

//       setAuthenticated(false);

//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================================================
//       REFRESH USER
//   ====================================================== */

//   const refreshUser =
//     async () => {
//       try {
//         const current =
//           await getCurrentUser();

//         userStorage.save(current);

//         setUser(current);

//         return current;
//       } catch {
//         return null;
//       }
//     };

//   /* ======================================================
//       CHECK AUTH ON LOAD
//   ====================================================== */

//   useEffect(() => {
//     const token =
//       tokenStorage.get();

//     if (!token) {
//       setAuthenticated(false);

//       return;
//     }

//     const storedUser =
//       userStorage.get();

//     if (storedUser) {
//       setUser(storedUser);

//       setAuthenticated(true);
//     }
//   }, []);

//   /* ======================================================
//       RETURN
//   ====================================================== */

//   return {
//     user,

//     loading,

//     authenticated,

//     login,

//     logout,

//     refreshUser,

//     setUser,
//   };
// }



// ==========================================================
// src/hooks/useAuth.js
// ----------------------------------------------------------
// Authentication Hook
// Redux Toolkit + RTK Query
// ==========================================================

import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,

    token: auth.token,

    role: auth.user?.role || null,

    isAuthenticated: auth.isAuthenticated,

    isAdmin: auth.user?.role === "admin",

    isTeacher: auth.user?.role === "teacher",

    isStudent: auth.user?.role === "student",

    isParent: auth.user?.role === "parent",
  };
}