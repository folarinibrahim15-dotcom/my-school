import React from "react";
import { FiBell, FiCalendar } from "react-icons/fi";

export default function TeacherAnnouncements() {

    const announcements = [
        {
            title: "Staff Meeting Scheduled",
            description: "All teachers are required to attend the departmental meeting on Friday.",
            date: "14 August, 2026",
            type: "Staff Notice"
        },
        {
            title: "Examination Timetable Released",
            description: "Teachers can now access the examination schedule and prepare accordingly.",
            date: "10 August, 2026",
            type: "Academic"
        },
        {
            title: "Submit Continuous Assessment Scores",
            description: "Please ensure all student assessment scores are uploaded before the deadline.",
            date: "05 August, 2026",
            type: "Reminder"
        }
    ];

    const section = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #f1f5f9",
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem", // gap-3
        marginBottom: "1.25rem" // mb-5
    };

    const headerIconBox = {
        height: "2.5rem", // h-10
        width: "2.5rem", // w-10
        borderRadius: "0.5rem", // rounded-lg
        backgroundColor: "#eff6ff", // bg-blue-50
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1d4ed8", // text-blue-700
        flexShrink: 0
    };

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#1e293b", // text-slate-800
        margin: 0
    };

    const list = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem" // space-y-4
    };

    const card = {
        border: "1px solid #e2e8f0", // border-slate-200
        borderRadius: "0.75rem", // rounded-xl
        padding: "1rem", // p-4
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease"
    };

    const cardHeader = {
        display: "flex",
        flexDirection: "column", // mobile: stack
        gap: "0.75rem" // gap-3
    };

    const cardHeaderDesktop = `
        @media (min-width: 640px) {
            .announce-header {
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
        }
    `;

    const announceTitle = {
        fontWeight: "600",
        color: "#1e293b", // text-slate-800
        lineHeight: 1.4
    };

    const badge = {
        fontSize: "0.75rem", // text-xs
        padding: "0.25rem 0.75rem", // px-3 py-1
        borderRadius: "9999px", // rounded-full
        backgroundColor: "#eff6ff", // bg-blue-50
        color: "#1d4ed8", // text-blue-700
        width: "fit-content",
        fontWeight: "500"
    };

    const description = {
        fontSize: "0.875rem", // text-sm
        color: "#64748b", // text-slate-500
        marginTop: "0.5rem", // mt-2
        lineHeight: 1.6
    };

    const dateRow = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        fontSize: "0.75rem", // text-xs
        color: "#94a3b8", // text-slate-400
        marginTop: "0.75rem" // mt-3
    };

    return (
        <>
            <style>{cardHeaderDesktop}</style>
            <section style={section}>

                <div style={header}>
                    <div style={headerIconBox}>
                        <FiBell size={18} />
                    </div>
                    <h2 style={title}>
                        Announcements
                    </h2>
                </div>

                <div style={list}>
                    {announcements.map((item) => (
                        <div
                            key={item.title}
                            style={card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 14px rgba(15, 23, 42, 0.06)";
                                e.currentTarget.style.borderColor = "#bfdbfe";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor = "#e2e8f0";
                            }}
                        >
                            <div className="announce-header" style={cardHeader}>
                                <h3 style={announceTitle}>
                                    {item.title}
                                </h3>
                                <span style={badge}>
                                    {item.type}
                                </span>
                            </div>

                            <p style={description}>
                                {item.description}
                            </p>

                            <div style={dateRow}>
                                <FiCalendar size={14} />
                                {item.date}
                            </div>

                        </div>
                    ))}
                </div>

            </section>
        </>
    );
}