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
    | Statistics - NOW READS REAL EDITED DATA
    |--------------------------------------------------------------------------
    */
    const totalTeachers = teacherList.length;

    // Reads edited status field first, falls back to isActive boolean
    const activeTeachers = teacherList.filter((teacher) => {
        if (teacher?.status) {
            return teacher.status === "Active";
        }
        // fallback for old data
        return teacher?.isActive === true;
    }).length;

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
            if (teacher.qualification) {
                return [teacher.qualification];
            }
            return [];
        })
    ).size;

    const cards = [
        {
            title: "Total Teachers",
            value: totalTeachers,
            icon: HiUsers,
            bg: "#dbeafe",
            iconBg: "#1d4ed8",
        },
        {
            title: "Active Teachers",
            value: activeTeachers,
            icon: HiCheckCircle,
            bg: "#dcfce7",
            iconBg: "#15803d",
        },
        {
            title: "Departments",
            value: totalDepartments,
            icon: HiBuildingOffice2,
            bg: "#f3e8ff",
            iconBg: "#7c3aed",
        },
        {
            title: "Subjects",
            value: totalSubjects,
            icon: HiAcademicCap,
            bg: "#ffedd5",
            iconBg: "#c2410c",
        },
    ];

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.5rem",
        width: "100%",
        boxSizing: "border-box"
    };

    const gridResponsive = `
        @media (min-width: 640px) {
            .teacher-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1280px) {
            .teacher-stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @keyframes teacherPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    `;

    const cardBaseStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "clamp(20px, 4vw, 1.5rem)",
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
        height: "1rem",
        width: "6rem",
        backgroundColor: "#e5e7eb",
        borderRadius: "0.5rem",
        marginBottom: "1rem"
    };

    const skeletonLine2 = {
        height: "2.5rem",
        width: "5rem",
        backgroundColor: "#e5e7eb",
        borderRadius: "0.5rem"
    };

    const cardText = {
        flex: 1,
        minWidth: 0
    };

    const cardTitle = {
        fontSize: "0.875rem",
        color: "#64748b",
        margin: 0,
        fontWeight: 500
    };

    const cardValue = {
        fontSize: "clamp(1.75rem, 4vw, 1.875rem)",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0.5rem 0 0 0",
        lineHeight: 1.2
    };

    const iconBox = (bg, color) => ({
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "1rem",
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