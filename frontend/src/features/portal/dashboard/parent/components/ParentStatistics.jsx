import React, { useState, useEffect } from "react";
import {
    HiUsers,
    HiCheckCircle,
    HiHome,
    HiUserGroup,
} from "react-icons/hi2";

export default function ParentStatistics({
    parents = [],
    loading = false,
}) {
    const [cols, setCols] = useState("1fr");

    useEffect(() => {
        const updateCols = () => {
            const w = window.innerWidth;
            if (w >= 1280) setCols("repeat(4, 1fr)"); // xl: 4 columns
            else if (w >= 768) setCols("repeat(2, 1fr)"); // md: 2 columns
            else setCols("1fr"); // mobile: 1 column vertical
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    const parentList = Array.isArray(parents) ? parents : [];

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */
    const totalParents = parentList.length;
    const activeParents = parentList.filter((parent) => parent?.isActive).length;
    const guardians = parentList.filter(
        (parent) => parent?.relationship?.toLowerCase() === "guardian"
    ).length;
    const parentsWithStudents = parentList.filter(
        (parent) => Array.isArray(parent?.students) && parent.students.length > 0
    ).length;

    const cards = [
        {
            title: "Total Parents",
            value: totalParents,
            bg: "#eff6ff", // bg-blue-100
            color: "#1d4ed8", // text-blue-700
            icon: HiUsers,
        },
        {
            title: "Active Parents",
            value: activeParents,
            bg: "#dcfce7", // bg-green-100
            color: "#15803d", // text-green-700
            icon: HiCheckCircle,
        },
        {
            title: "Parents With Students",
            value: parentsWithStudents,
            bg: "#f3e8ff", // bg-purple-100
            color: "#7e22ce", // text-purple-700
            icon: HiUserGroup,
        },
        {
            title: "Guardians",
            value: guardians,
            bg: "#ffedd5", // bg-orange-100
            color: "#c2410c", // text-orange-700
            icon: HiHome,
        },
    ];

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: cols,
        gap: "1.5rem", // gap-6
        width: "100%",
        boxSizing: "border-box",
        padding: "clamp(12px, 3vw, 24px)", // breathing space so it never touches edges
    };

    const cardBaseStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb", // border-gray-200
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)", // shadow-sm
        padding: "clamp(20px, 3vw, 24px)", // p-6
        transition: "all 0.3s ease",
        cursor: "default"
    };

    if (loading) {
        return (
            <div style={gridStyle}>
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        style={{
                            ...cardBaseStyle,
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                        }}
                    >
                        <div
                            style={{
                                height: "1rem", // h-4
                                width: "7rem", // w-28
                                backgroundColor: "#e2e8f0", // bg-gray-200
                                borderRadius: "0.5rem",
                                marginBottom: "1.25rem" // mb-5
                            }}
                        />
                        <div
                            style={{
                                height: "2.5rem", // h-10
                                width: "5rem", // w-20
                                backgroundColor: "#e2e8f0",
                                borderRadius: "0.5rem"
                            }}
                        />
                    </div>
                ))}
                <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }`}</style>
            </div>
        );
    }

    return (
        <div style={gridStyle}>
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div
                        key={card.title}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 12px 28px rgba(15,23,42,0.12)"; // hover:shadow-lg
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.06)";
                        }}
                        style={cardBaseStyle}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "1rem"
                            }}
                        >
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                    style={{
                                        fontSize: "0.875rem", // text-sm
                                        color: "#64748b", // text-gray-500
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}
                                >
                                    {card.title}
                                </p>
                                <h2
                                    style={{
                                        fontSize: "clamp(1.75rem, 5vw, 1.875rem)", // text-3xl responsive
                                        fontWeight: "700",
                                        marginTop: "0.5rem", // mt-2
                                        color: "#1e293b", // text-slate-800
                                        margin: "0.5rem 0 0 0",
                                        lineHeight: 1.1
                                    }}
                                >
                                    {card.value.toLocaleString()}
                                </h2>
                            </div>

                            <div
                                style={{
                                    height: "4rem", // h-16
                                    width: "4rem", // w-16
                                    borderRadius: "1rem", // rounded-2xl
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: card.bg,
                                    color: card.color,
                                    flexShrink: 0,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                                }}
                            >
                                <Icon style={{ fontSize: "1.875rem" }} /> {/* text-3xl */}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}