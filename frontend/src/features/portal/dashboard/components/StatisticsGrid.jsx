import React from "react";

import {
    HiOutlineAcademicCap,
    HiOutlineUserGroup,
    HiOutlineUsers,
    HiOutlineBanknotes,
} from "react-icons/hi2";

import { useGetDashboardStatsQuery } from "../../../../redux/api/dashboardApi";

import StatCard from "./StatCard";

export default function StatisticsGrid() {

    const { data, isLoading, error } = useGetDashboardStatsQuery();
        // console.log("Dashboard API:", data);
        // console.log("Dashboard Error:", error);

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                Loading Dashboard Statistics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center text-red-600">
                Failed to load dashboard statistics.
            </div>
        );
    }

    const stats = data?.data || {};

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem', // more space between cards
                padding: '0 1.5rem', // space left and right so it doesn't touch screen
                justifyContent: 'center',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}
        >
            <div style={{ flex: '1 1 100%', minWidth: '16rem', maxWidth: '20rem' }}>
                <StatCard
                    title="Students"
                    value={stats.totalStudents ?? 0}
                    icon={HiOutlineAcademicCap}
                    change="+12 this week"
                    color="text-green-600"
                />
            </div>

            <div style={{ flex: '1 1 100%', minWidth: '16rem', maxWidth: '20rem' }}>
                <StatCard
                    title="Teachers"
                    value={stats.totalTeachers ?? 0}
                    icon={HiOutlineUserGroup}
                    change="+2 this month"
                    color="text-blue-600"
                />
            </div>

            <div style={{ flex: '1 1 100%', minWidth: '16rem', maxWidth: '20rem' }}>
                <StatCard
                    title="Parents"
                    value={stats.totalParents ?? 0}
                    icon={HiOutlineUsers}
                    change="+18 this week"
                    color="text-purple-600"
                />
            </div>

            <div style={{ flex: '1 1 100%', minWidth: '16rem', maxWidth: '20rem' }}>
                <StatCard
                    title="Admissions"
                    value={stats.totalAdmissions ?? 0}
                    icon={HiOutlineBanknotes}
                    change="+8%"
                    color="text-orange-600"
                />
            </div>
        </div>
    );

}