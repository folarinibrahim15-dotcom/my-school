// ==========================================================
// src/context/AuthContext.jsx
// ----------------------------------------------------------
// Global Authentication Context
//
// Provides authentication state to the entire application.
//
// Uses:
// - useAuth()
// - React Context API
//
// Future:
// Can easily be migrated to Redux Toolkit if needed.
// ==========================================================

import {
  createContext,
  useContext,
} from "react";

import useAuth from "../hooks/useAuth";

/* ==========================================================
   CREATE CONTEXT
========================================================== */

const AuthContext = createContext(null);

/* ==========================================================
   PROVIDER
========================================================== */

export function AuthProvider({
  children,
}) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/* ==========================================================
   CUSTOM HOOK
========================================================== */

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthProvider."
    );
  }

  return context;
}

export default AuthContext;


