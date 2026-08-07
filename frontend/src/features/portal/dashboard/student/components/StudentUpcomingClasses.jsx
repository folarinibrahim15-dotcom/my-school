import React from "react";
import { FiClock, FiBookOpen, FiUser } from "react-icons/fi";

export default function StudentUpcomingClasses() {

    const classes = [
        {
            time: "08:00 AM",
            subject: "Mathematics",
            teacher: "Mr. Ade",
            room: "Class SS2 A"
        },
        {
            time: "10:00 AM",
            subject: "Physics",
            teacher: "Mrs. Bello",
            room: "Science Lab"
        },
        {
            time: "01:00 PM",
            subject: "English Language",
            teacher: "Mr. John",
            room: "Class SS2 A"
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
        justifyContent: "space-between",
        marginBottom: "1.25rem", // mb-5
        flexWrap: "wrap",
        gap: "0.5rem"
    };

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#1e293b", // text-slate-800
        margin: 0
    };

    const todayTag = {
        fontSize: "0.875rem", // text-sm
        color: "#1d4ed8", // text-blue-700
        fontWeight: "500"
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
        display: "flex",
        flexDirection: "column", // mobile: stack
        gap: "1rem", // gap-4
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff"
    };

    const cardDesktop = `
        @media (min-width: 640px) {
            .student-class-card {
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
        }
    `;

    const timeWrap = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem" // gap-3
    };

    const iconBox = {
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

    const timeText = {
        fontWeight: "600",
        color: "#1e293b" // text-slate-800
    };

    const subjectText = {
        fontSize: "0.875rem", // text-sm
        color: "#64748b" // text-slate-500
    };

    const metaItem = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        color: "#475569", // text-slate-600
        fontSize: "0.875rem" // text-sm
    };

    const metaItemMuted = {
        ...metaItem,
        color: "#64748b" // text-slate-500
    };

    return (
        <>
            <style>{cardDesktop}</style>
            <section style={section}>

                <div style={header}>
                    <h2 style={title}>
                        Upcoming Classes
                    </h2>
                    <span style={todayTag}>
                        Today
                    </span>
                </div>

                <div style={list}>
                    {classes.map((item) => (
                        <div
                            key={item.time}
                            className="student-class-card"
                            style={card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#bfdbfe";
                                e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e2e8f0";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {/* Time & Subject */}
                            <div style={timeWrap}>
                                <div style={iconBox}>
                                    <FiClock size={18} />
                                </div>
                                <div>
                                    <p style={timeText}>
                                        {item.time}
                                    </p>
                                    <p style={subjectText}>
                                        {item.subject}
                                    </p>
                                </div>
                            </div>

                            {/* Teacher */}
                            <div style={metaItem}>
                                <FiUser size={16} />
                                <span>{item.teacher}</span>
                            </div>

                            {/* Room */}
                            <div style={metaItemMuted}>
                                <FiBookOpen size={16} />
                                <span>{item.room}</span>
                            </div>

                        </div>
                    ))}
                </div>

            </section>
        </>
    );
}