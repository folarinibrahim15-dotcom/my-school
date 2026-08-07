import React from "react";
import {
    HiOutlineAcademicCap,
    HiOutlineUserGroup,
    HiOutlineBriefcase,
    HiOutlineCurrencyDollar,
    HiOutlineDocumentChartBar,
} from "react-icons/hi2";

export default function ReportsStatistics({
    dashboard = {},
}) {

    const cards = [
        {
            title: "Students",
            value: dashboard.totalStudents || 0,
            bg: "#2563eb", // bg-blue-600
            icon: <HiOutlineAcademicCap size={28} />,
        },
        {
            title: "Teachers",
            value: dashboard.totalTeachers || 0,
            bg: "#4f46e5", // bg-indigo-600
            icon: <HiOutlineBriefcase size={28} />,
        },
        {
            title: "Parents",
            value: dashboard.totalParents || 0,
            bg: "#16a34a", // bg-green-600
            icon: <HiOutlineUserGroup size={28} />,
        },
        {
            title: "Admissions",
            value: dashboard.totalAdmissions || 0,
            bg: "#eab308", // bg-yellow-500
            icon: <HiOutlineDocumentChartBar size={28} />,
        },
        {
            title: "Revenue",
            value: `₦${Number(dashboard.totalRevenue || 0).toLocaleString()}`,
            bg: "#9333ea", // bg-purple-600
            icon: <HiOutlineCurrencyDollar size={28} />,
        },
    ];

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr", // default mobile = 1 column vertical
        gap: "1.5rem", // gap-6
        width: "100%"
    };

    const gridResponsive = `
        @media (min-width: 768px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr) !important; /* md: 2 columns */
            }
        }
        @media (min-width: 1280px) {
            .stats-grid {
                grid-template-columns: repeat(5, 1fr) !important; /* xl: 5 columns */
            }
        }
    `;

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(18px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        transition: "all 0.2s ease"
    };

    const label = {
        color: "#64748b", // text-gray-500
        fontSize: "0.875rem", // text-sm
        margin: 0
    };

    const value = {
        fontSize: "clamp(1.5rem, 5vw, 1.875rem)", // text-3xl responsive
        fontWeight: "700",
        marginTop: "0.5rem", // mt-2
        color: "#0f172a",
        lineHeight: 1.2
    };

    const iconBox = (bg) => ({
        backgroundColor: bg,
        color: "#ffffff",
        padding: "clamp(0.75rem, 3vw, 1rem)", // p-4 responsive
        borderRadius: "0.75rem", // rounded-xl
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 4px 14px ${bg}40` // soft glow
    });

    return (
        <>
            <style>{gridResponsive}</style>
            <div className="stats-grid" style={grid}>
                {cards.map((cardItem) => (
                    <div
                        key={cardItem.title}
                        style={card}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.06)";
                        }}
                    >
                        <div>
                            <p style={label}>{cardItem.title}</p>
                            <h2 style={value}>{cardItem.value}</h2>
                        </div>

                        <div style={iconBox(cardItem.bg)}>
                            {cardItem.icon}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}