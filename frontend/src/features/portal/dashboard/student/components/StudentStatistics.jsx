import React from "react";
import {
    HiOutlineAcademicCap,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineSparkles,
} from "react-icons/hi2";

export default function StudentStatistics({
    students = [],
    loading = false,
}) {

    const studentList = Array.isArray(students) ? students : [];

    const totalStudents = studentList.length;
    const maleStudents = studentList.filter((s) => s?.gender?.toLowerCase() === "male").length;
    const femaleStudents = studentList.filter((s) => s?.gender?.toLowerCase() === "female").length;
    const activeStudents = studentList.filter((s) => s?.status?.toLowerCase() === "active").length;
    const graduatedStudents = studentList.filter((s) => s?.status?.toLowerCase() === "graduated").length;
    const newAdmissions = studentList.filter((s) => s?.status?.toLowerCase() === "new").length;

    const cards = [
        {
            title: "Total Students",
            value: totalStudents,
            icon: HiOutlineAcademicCap,
            bg: "#eff6ff", // bg-blue-50
            iconBg: "#2563eb", // bg-blue-600
        },
        {
            title: "Male Students",
            value: maleStudents,
            icon: HiOutlineUser,
            bg: "#f0f9ff", // bg-sky-50
            iconBg: "#0284c7", // bg-sky-600
        },
        {
            title: "Female Students",
            value: femaleStudents,
            icon: HiOutlineUserGroup,
            bg: "#fdf2f8", // bg-pink-50
            iconBg: "#db2777", // bg-pink-600
        },
        {
            title: "Active",
            value: activeStudents,
            icon: HiOutlineCheckCircle,
            bg: "#f0fdf4", // bg-green-50
            iconBg: "#16a34a", // bg-green-600
        },
        {
            title: "Graduated",
            value: graduatedStudents,
            icon: HiOutlineClock,
            bg: "#fff7ed", // bg-orange-50
            iconBg: "#ea580c", // bg-orange-600
        },
        {
            title: "New Admissions",
            value: newAdmissions,
            icon: HiOutlineSparkles,
            bg: "#faf5ff", // bg-purple-50
            iconBg: "#9333ea", // bg-purple-600
        },
    ];

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr", // mobile: 1 col
        gap: "1.5rem", // gap-6
        width: "100%",
        boxSizing: "border-box"
    };

    const gridResponsive = `
        @media (min-width: 640px) {
            .student-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } /* sm: 2 col */
        }
        @media (min-width: 1280px) {
            .student-stats-grid { grid-template-columns: repeat(3, 1fr) !important; } /* xl: 3 col */
        }
        @keyframes statsPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    `;

    const cardBase = {
        borderRadius: "1.5rem", // rounded-2xl
        border: "1px solid #e5e7eb", // border-gray-200
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        transition: "all 0.3s ease",
        cursor: "default",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const skeletonCard = {
        ...cardBase,
        backgroundColor: "#ffffff",
        animation: "statsPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    };

    const skeletonLine1 = {
        height: "1rem", // h-4
        width: "6rem", // w-24
        backgroundColor: "#e5e7eb", // bg-gray-200
        borderRadius: "0.25rem",
        marginBottom: "1.25rem" // mb-5
    };

    const skeletonLine2 = {
        height: "2.5rem", // h-10
        width: "5rem", // w-20
        backgroundColor: "#e5e7eb", // bg-gray-200
        borderRadius: "0.25rem"
    };

    const cardContent = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem"
    };

    const cardText = {
        flex: 1,
        minWidth: 0
    };

    const cardTitle = {
        fontSize: "0.875rem", // text-sm
        color: "#64748b", // text-gray-500
        margin: 0,
        fontWeight: "500"
    };

    const cardValue = {
        marginTop: "0.75rem", // mt-3
        fontSize: "clamp(2rem, 5vw, 2.25rem)", // text-4xl responsive
        fontWeight: "700",
        color: "#1e293b" // text-slate-800
    };

    const iconBox = (bg) => ({
        backgroundColor: bg,
        height: "3.5rem", // h-14
        width: "3.5rem", // w-14
        borderRadius: "1rem", // rounded-2xl
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        flexShrink: 0
    });

    if (loading) {
        return (
            <>
                <style>{gridResponsive}</style>
                <div className="student-stats-grid" style={grid}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} style={skeletonCard}>
                            <div style={skeletonLine1} />
                            <div style={skeletonLine2} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <style>{gridResponsive}</style>
            <div className="student-stats-grid" style={grid}>
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            style={{ ...cardBase, backgroundColor: card.bg }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 16px 40px rgba(15, 23, 42, 0.12)";
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "#bfdbfe";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.06)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "#e5e7eb";
                            }}
                        >
                            <div style={cardContent}>
                                <div style={cardText}>
                                    <p style={cardTitle}>
                                        {card.title}
                                    </p>
                                    <h2 style={cardValue}>
                                        {card.value.toLocaleString()}
                                    </h2>
                                </div>

                                <div style={iconBox(card.iconBg)}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}