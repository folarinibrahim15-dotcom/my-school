import React, { useEffect, useState } from "react";
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

    /*
    |--------------------------------------------------------------------------
    | Session readiness
    |--------------------------------------------------------------------------
    |
    | We must NOT render child routes until the /auth/me response has been
    | copied into Redux. Otherwise RoleRoute can run while role is still null.
    |
    */

    const [sessionReady, setSessionReady] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useGetCurrentUserQuery();

    /*
    |--------------------------------------------------------------------------
    | Restore authenticated user
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (data?.user) {
            dispatch(
                setCredentials({
                    user: data.user,

                    /*
                    | Keep an existing token if /auth/me does not return one.
                    | This is useful when authentication is maintained by a
                    | cookie and /auth/me only returns the user.
                    */
                    token: data.token ?? null,
                })
            );

            setSessionReady(true);

            return;
        }

        if (isError || !data?.user) {
            dispatch(logout());
            setSessionReady(true);
        }
    }, [
        data,
        isLoading,
        isError,
        dispatch,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Wait for authentication verification
    |--------------------------------------------------------------------------
    */

    if (isLoading || !sessionReady) {
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

    /*
    |--------------------------------------------------------------------------
    | Authentication failed
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
    | Authentication successful
    |--------------------------------------------------------------------------
    |
    | Redux now contains the authenticated user before RoleRoute runs.
    |
    */

    return <Outlet />;
}
