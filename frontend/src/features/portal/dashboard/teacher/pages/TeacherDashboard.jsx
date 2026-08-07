import React from "react";

import TeacherWelcome from "../components/TeacherWelcome";
import TeacherStatistics from "../components/TeacherStatistics";
import TeacherQuickActions from "../components/TeacherQuickActions";
import TeacherUpcomingClasses from "../components/TeacherUpcomingClasses";
import TeacherAnnouncements from "../components/TeacherAnnouncements";

import { useGetTeachersQuery } from "../../../../../redux/api/teacherApi";

export default function TeacherDashboard() {

    const {
        data,
        isLoading,
    } = useGetTeachersQuery({
        page: 1,
        limit: 1000,
    });

    const teachers =
        data?.teachers ||
        data?.data ||
        [];

    return (

        <div className="space-y-6">

            <TeacherWelcome />

            <TeacherStatistics
                teachers={teachers}
                loading={isLoading}
            />

            <TeacherQuickActions />

            <TeacherUpcomingClasses />

            <TeacherAnnouncements />

        </div>

    );
}