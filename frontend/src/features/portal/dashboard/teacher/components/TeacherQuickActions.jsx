import React, { useState } from "react";
import {
    FiBookOpen,
    FiFileText,
    FiCheckSquare,
    FiBarChart2,
    FiArrowRight
} from "react-icons/fi";

export default function TeacherQuickActions() {

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const actions = [
        {
            title: "Manage Classes",
            description: "View and organize your classes",
            icon: <FiBookOpen />
        },
        {
            title: "Create Assignment",
            description: "Give students new tasks",
            icon: <FiFileText />
        },
        {
            title: "Take Attendance",
            description: "Record student attendance",
            icon: <FiCheckSquare />
        },
        {
            title: "Upload Results",
            description: "Submit student scores",
            icon: <FiBarChart2 />
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

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#1e293b", // text-slate-800
        margin: 0,
        marginBottom: "1.25rem" // mb-5
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr", // mobile: 1 col
        gap: "1.25rem" // gap-5
    };

    const gridResponsive = `
        @media (min-width: 640px) {
            .quick-actions-grid { grid-template-columns: repeat(2, 1fr) !important; } /* sm: 2 col */
        }
        @media (min-width: 1024px) {
            .quick-actions-grid { grid-template-columns: repeat(4, 1fr) !important; } /* lg: 4 col */
        }
    `;

    const buttonBase = {
        textAlign: "left",
        border: "1px solid #e2e8f0", // border-slate-200
        borderRadius: "0.75rem", // rounded-xl
        padding: "1.25rem", // p-5
        backgroundColor: "#ffffff",
        cursor: "pointer",
        transition: "all 0.25s ease",
        width: "100%",
        boxSizing: "border-box"
    };

    const iconBox = {
        height: "2.75rem", // h-11
        width: "2.75rem", // w-11
        borderRadius: "0.5rem", // rounded-lg
        backgroundColor: "#eff6ff", // bg-blue-50
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1d4ed8", // text-blue-700
        fontSize: "1.25rem", // text-xl
        flexShrink: 0
    };

    const headerRow = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem" // mb-4
    };

    const actionTitle = {
        fontWeight: "600",
        color: "#1e293b" // text-slate-800
    };

    const actionDesc = {
        fontSize: "0.875rem", // text-sm
        color: "#64748b", // text-slate-500
        marginTop: "0.25rem", // mt-1
        lineHeight: 1.6
    };

    return (
        <>
            <style>{gridResponsive}</style>
            <section style={section}>
                <h2 style={title}>
                    Quick Actions
                </h2>

                <div className="quick-actions-grid" style={grid}>
                    {actions.map((action, index) => {
                        const isHovered = hoveredIndex === index;
                        return (
                            <button
                                key={action.title}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    ...buttonBase,
                                    boxShadow: isHovered ? "0 8px 24px rgba(15, 23, 42, 0.08)" : "none",
                                    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                                    borderColor: isHovered ? "#bfdbfe" : "#e2e8f0"
                                }}
                            >
                                <div style={headerRow}>
                                    <div style={iconBox}>
                                        {action.icon}
                                    </div>

                                    <FiArrowRight 
                                        size={18} 
                                        color={isHovered ? "#1d4ed8" : "#94a3b8"} 
                                        style={{ transition: "color 0.25s ease" }}
                                    />
                                </div>

                                <h3 style={actionTitle}>
                                    {action.title}
                                </h3>

                                <p style={actionDesc}>
                                    {action.description}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </section>
        </>
    );
}