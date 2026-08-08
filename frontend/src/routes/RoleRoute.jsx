import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleRoute({ allowedRoles = [] }) {
    const {
        role,
        isAuthenticated,
    } = useAuth();

    /*
    |--------------------------------------------------------------------------
    | Authentication check
    |--------------------------------------------------------------------------
    */

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/portal/login"
                replace
            />
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize role
    |--------------------------------------------------------------------------
    */

    const normalizedRole = String(role || "")
        .trim()
        .toLowerCase();

    const normalizedAllowedRoles = allowedRoles.map(
        (allowedRole) =>
            String(allowedRole || "")
                .trim()
                .toLowerCase()
    );

    /*
    |--------------------------------------------------------------------------
    | Role authorization
    |--------------------------------------------------------------------------
    */

    if (!normalizedAllowedRoles.includes(normalizedRole)) {
        return (
            <Navigate
                to="/portal/unauthorized"
                replace
            />
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Authorized
    |--------------------------------------------------------------------------
    */

    return <Outlet />;
}
