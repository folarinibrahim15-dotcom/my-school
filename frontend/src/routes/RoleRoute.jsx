import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleRoute({
  allowedRoles,
}) {
  const {
    role,
    isAuthenticated,
  } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/portal/login"
        replace
      />
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/portal/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}