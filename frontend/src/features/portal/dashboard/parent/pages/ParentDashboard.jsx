import React from "react";

import ParentWelcome from "../components/ParentWelcome";
import ParentStatistics from "../components/ParentStatistics";
import ParentQuickActions from "../components/ParentQuickActions";
import ParentAnnouncement from "../components/ParentAnnouncement";

import { useGetParentsQuery } from "../../../../../redux/api/parentApi";

export default function ParentDashboard() {

    /*
    |--------------------------------------------------------------------------
    | Fetch Parents
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading,
        isError,
    } = useGetParentsQuery({
        page: 1,
        limit: 1000,
        search: "",
        relationship: "",
        gender: "",
        occupation: "",
    });

    /*
    |--------------------------------------------------------------------------
    | Normalize API Response
    |--------------------------------------------------------------------------
    */

    const parents =
        data?.parents ||
        data?.data ||
        [];

    return (

        <main
            className="
                min-h-screen
                bg-slate-100
                p-6
            "
        >

            {/* Welcome */}

            <ParentWelcome />

            {/* Statistics */}

            <div className="mt-6">

                <ParentStatistics
                    parents={parents}
                    loading={isLoading}
                />

            </div>

            {/* Error */}

            {isError && (

                <div
                    className="
                        mt-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        text-red-600
                    "
                >
                    Unable to load parent statistics.
                </div>

            )}

            {/* Bottom Section */}

            <div
                className="
                    mt-6
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-6
                "
            >

                <div className="xl:col-span-1">

                    <ParentQuickActions />

                </div>

                <div className="xl:col-span-2">

                    <ParentAnnouncement />

                </div>

            </div>

        </main>

    );

}