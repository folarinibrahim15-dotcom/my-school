import React from "react";
import {
    HiUsers,
    HiCheckCircle,
    HiBuildingOffice2,
    HiAcademicCap,
} from "react-icons/hi2";

export default function TeacherStatistics({
    teachers = [],
    loading = false,
}) {
    const teacherList = Array.isArray(teachers) ? teachers : [];

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */
    const totalTeachers = teacherList.length;
    const activeTeachers = teacherList.filter((teacher) => teacher?.isActive === true).length;
    const totalDepartments = new Set(
        teacherList
            .map((teacher) => teacher.department || teacher.specialization)
            .filter(Boolean)
    ).size;
    const totalSubjects = new Set(
        teacherList.flatMap((teacher) => {
            if (Array.isArray(teacher.subjects)) {
                return teacher.subjects;
            }
            if (teacher.subject) {
                return [teacher.subject];
            }
            return [];
        })
    ).size;

    const cards = [
        {
            title: "Total Teachers",
            value: totalTeachers,
            icon: HiUsers,
            bg: "#dbeafe", // bg-blue-100
            iconBg: "#1d4ed8", // text-blue-700
        },
        {
            title: "Active Teachers",
            value: activeTeachers,
            icon: HiCheckCircle,
            bg: "#dcfce7", // bg-green-100
            iconBg: "#15803d", // text-green-700
        },
        {
            title: "Departments",
            value: totalDepartments,
            icon: HiBuildingOffice2,
            bg: "#f3e8ff", // bg-purple-100
            iconBg: "#7c3aed", // text-purple-700
        },
        {
            title: "Subjects",
            value: totalSubjects,
            icon: HiAcademicCap,
            bg: "#ffedd5", // bg-orange-100
            iconBg: "#c2410c", // text-orange-700
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
            .teacher-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } /* sm: 2 col */
        }
        @media (min-width: 1280px) {
            .teacher-stats-grid { grid-template-columns: repeat(4, 1fr) !important; } /* xl: 4 col */
        }
        @keyframes teacherPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    `;

    const cardBaseStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        cursor: "default"
    };

    const skeletonCard = {
        ...cardBaseStyle,
        flexDirection: "column",
        alignItems: "flex-start",
        animation: "teacherPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    };

    const skeletonLine1 = {
        height: "1rem", // h-4
        width: "6rem", // w-24
        backgroundColor: "#e5e7eb", // bg-gray-200
        borderRadius: "0.5rem",
        marginBottom: "1rem"
    };

    const skeletonLine2 = {
        height: "2.5rem", // h-10
        width: "5rem", // w-20
        backgroundColor: "#e5e7eb", // bg-gray-200
        borderRadius: "0.5rem"
    };

    const cardText = {
        flex: 1,
        minWidth: 0
    };

    const cardTitle = {
        fontSize: "0.875rem", // text-sm
        color: "#64748b", // text-gray-500
        margin: 0,
        fontWeight: 500
    };

    const cardValue = {
        fontSize: "clamp(1.75rem, 4vw, 1.875rem)", // text-3xl responsive
        fontWeight: "700",
        color: "#0f172a", // text-slate-800
        margin: "0.5rem 0 0 0",
        lineHeight: 1.2
    };

    const iconBox = (bg, color) => ({
        width: "3.5rem", // w-14
        height: "3.5rem", // h-14
        borderRadius: "1rem", // rounded-2xl
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
        color: color,
        flexShrink: 0
    });

    if (loading) {
        return (
            <>
                <style>{gridResponsive}</style>
                <section>
                    <div className="teacher-stats-grid" style={grid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} style={skeletonCard}>
                                <div style={skeletonLine1} />
                                <div style={skeletonLine2} />
                            </div>
                        ))}
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <style>{gridResponsive}</style>
            <section>
                <div className="teacher-stats-grid" style={grid}>
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                style={cardBaseStyle}
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
                                <div style={cardText}>
                                    <p style={cardTitle}>
                                        {card.title}
                                    </p>
                                    <h2 style={cardValue}>
                                        {card.value.toLocaleString()}
                                    </h2>
                                </div>

                                <div style={iconBox(card.bg, card.iconBg)}>
                                    <Icon size={28} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}