import React, { useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  useGetCurrentUserQuery,
} from "../redux/api/authApi";

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
  } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token ?? null,
        })
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Verifying authentication...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !data?.user) {
    return (
      <Navigate
        to="/portal/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}