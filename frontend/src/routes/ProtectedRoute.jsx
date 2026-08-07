// ==========================================================
// src/routes/ProtectedRoute.jsx
// ----------------------------------------------------------
// Protects authenticated routes.
//
// Uses:
// ✓ RTK Query
// ✓ Redux Toolkit
// ✓ JWT Cookies
// ✓ Refresh Token
//
// Automatically:
// - Checks current logged-in user
// - Restores Redux authentication state
// - Redirects unauthenticated users
// ==========================================================


import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetCurrentUserQuery } from "../redux/api/authApi";
import {
  setCredentials,
  logout,
} from "../features/auth/authSlice";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  /*
  |--------------------------------------------------------------------------
  | Restore Authentication
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (data?.user) {
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token ?? null,
        })
      );
    }

    if (isError) {
      dispatch(logout());
    }
  }, [data, isError, dispatch]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />

          <p className="mt-4 text-sm font-medium text-gray-600">
            Verifying authentication...
          </p>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not Authenticated
  |--------------------------------------------------------------------------
  */

  if (isError || !data?.user) {
    return (
      <Navigate
        to="/portal/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Authenticated
  |--------------------------------------------------------------------------
  */

  return <Outlet />;
}