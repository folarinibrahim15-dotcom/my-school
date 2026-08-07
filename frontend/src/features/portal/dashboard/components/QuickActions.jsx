import React from "react";

import {

    HiOutlineUserPlus,

    HiOutlineAcademicCap,

    HiOutlineBanknotes,

    HiOutlineBell,

    HiOutlineDocumentChartBar,

    HiOutlineClipboardDocumentList,

} from "react-icons/hi2";

import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {

    return (
    <div
        style={{
            margin: '1.5rem', // space on all sides so it never touches screen edges
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}
    >
        <h2
            style={{
                fontSize: '1.5rem', // text-2xl
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#0f172a',
                lineHeight: '1.6',
                letterSpacing: '-0.01em'
            }}
        >
            Quick Actions
        </h2>

        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // responsive: 1 col mobile, 2 col tablet, 3 col desktop
                gap: '1.5rem', // gap-6
                width: '100%'
            }}
        >
            <QuickActionCard
                title="Add Student"
                description="Register a new student"
                icon={HiOutlineUserPlus}
                to="/portal/students"
                color="#2563eb" // modern blue
            />

            <QuickActionCard
                title="New Admission"
                description="Process new admission"
                icon={HiOutlineAcademicCap}
                to="/portal/admissions"
                color="#7c3aed" // modern purple
                />

            <QuickActionCard
                title="Record Payment"
                description="Add school fee payment"
                icon={HiOutlineBanknotes}
                to="/portal/finance"
                color="#16a34a" // modern green
            />

            <QuickActionCard
                title="Send Notification"
                description="Notify students & parents"
                icon={HiOutlineBell}
                to="/portal/notifications"
                color="#eab308" // modern yellow
            />

            <QuickActionCard
                title="Generate Report"
                description="Academic & finance reports"
                icon={HiOutlineDocumentChartBar}
                to="/portal/reports"
                color="#dc2626" // modern red
            />

            <QuickActionCard
                title="Manage Parents"
                description="Edit Parents Icon"
                icon={HiOutlineClipboardDocumentList}
                to="/portal/parents"
                color="#4f46e5" // modern indigo
            />
        </div>
    </div>
);

}