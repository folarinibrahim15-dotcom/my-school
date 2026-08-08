import React, { useEffect } from "react";
import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
    | Get Existing Authentication State
    |--------------------------------------------------------------------------
    */

    const existingToken = useSelector(
        (state) => state.auth?.token
    );


    /*
    |--------------------------------------------------------------------------
    | Verify Current User
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading,
        isError,
    } = useGetCurrentUserQuery();


    /*
    |--------------------------------------------------------------------------
    | Restore User Without Destroying Existing Token
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (data?.user) {

            dispatch(
                setCredentials({
                    user: data.user,

                    /*
                    |----------------------------------------------------------
                    | IMPORTANT
                    |----------------------------------------------------------
                    |
                    | If /auth/me returns a token, use it.
                    |
                    | If it does NOT return a token, KEEP the existing
                    | login token instead of replacing it with null.
                    |
                    */

                    token:
                        data.token ||
                        existingToken ||
                        null,
                })
            );
        }

    }, [
        data,
        existingToken,
        dispatch,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Logout When Authentication Fails
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (isError) {
            dispatch(logout());
        }

    }, [
        isError,
        dispatch,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

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
                state={{
                    from: location,
                }}
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
