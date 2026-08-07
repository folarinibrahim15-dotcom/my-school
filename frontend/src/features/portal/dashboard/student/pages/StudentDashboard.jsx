import React from "react";

import StudentWelcome from "../components/StudentWelcome";
import StudentStatistics from "../components/StudentStatistics";
import StudentQuickActions from "../components/StudentQuickActions";
import StudentUpcomingClasses from "../components/StudentUpcomingClasses";
import StudentAnnouncements from "../components/StudentAnnouncements";

import { useGetStudentsQuery } from "../../../../../redux/api/studentApi";

export default function StudentDashboard() {

    /*
    |--------------------------------------------------------------------------
    | Fetch Students
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading,
        isError,
    } = useGetStudentsQuery({
        page: 1,
        limit: 1000,
        search: "",
        class: "",
        status: "",
    });

    /*
    |--------------------------------------------------------------------------
    | Normalize API Response
    |--------------------------------------------------------------------------
    */

    const students =
        data?.students ||
        data?.data ||
        [];

    return (

        <div className="space-y-6">

            {/* Welcome */}

            <StudentWelcome />

            {/* Statistics */}

            <StudentStatistics
                students={students}
                loading={isLoading}
            />

            {/* Optional Error */}

            {isError && (

                <div
                    className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        text-red-600
                    "
                >
                    Unable to load student statistics.
                </div>

            )}

            {/* Quick Actions */}

            <StudentQuickActions />

            {/* Upcoming Classes */}

            <StudentUpcomingClasses />

            {/* Announcements */}

            <StudentAnnouncements />

        </div>

    );

}