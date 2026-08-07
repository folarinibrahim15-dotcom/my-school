import React from "react";

import StatisticsGrid from "../components/StatisticsGrid";
import ChartsGrid from "../components/ChartsGrid";
import RecentAdmissions from "../components/RecentAdmissions";
import NotificationsCard from "../components/NotificationsCard";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import EventsCalendarGrid from "../components/EventsCalendarGrid";
import ProfileStatusGrid from "../components/ProfileStatusGrid";


export default function Dashboard() {

   return (
    <div style={{
        padding: '2.5rem 1.5rem', // top/bottom: 2.5rem, left/right: 1.5rem
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem', // replaces space-y-8
        maxWidth: '100%',
        boxSizing: 'border-box'
    }}>

        {/* Header */}
        <div>
            <h1 style={{
                fontSize: '2.25rem',
                fontWeight: '700',
                margin: '0',
                lineHeight: '1.3',
                color: '#0f172a'
            }}>
                Dashboard
            </h1>
            <p style={{
                color: '#6b7280',
                marginTop: '0.5rem',
                fontSize: '1rem',
                lineHeight: '1.6'
            }}>
                Welcome back to Sound Peace ERP.
            </p>
        </div>

        {/* Statistics */}

        <StatisticsGrid />

        {/* Charts */}

        <ChartsGrid />

        {/* Admissions + Notifications */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2">

                <RecentAdmissions />

            </div>

            <NotificationsCard />

        </div>

        {/* Activity Timeline */}

        <ActivityTimeline />

        {/* Quick Actions */}

        <QuickActions />

        {/* Events Calendar Grid */}

        <EventsCalendarGrid />

        {/* Profile Status Grid */}

        <ProfileStatusGrid />

    </div>

);

}