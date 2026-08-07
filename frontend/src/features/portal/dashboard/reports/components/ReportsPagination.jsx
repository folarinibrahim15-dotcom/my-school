import React from "react";

export default function ReportsPagination() {

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(16px, 4vw, 1.25rem)", // p-5 responsive
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap", // stacks on mobile
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const text = {
        color: "#64748b", // text-gray-500
        fontSize: "0.95rem",
        margin: 0
    };

    const btnGroup = {
        display: "flex",
        gap: "0.5rem", // gap-2
        flexWrap: "wrap"
    };

    const btnBase = {
        padding: "0.5rem 1rem", // px-4 py-2
        borderRadius: "0.5rem", // rounded-lg
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
        transition: "all 0.2s ease"
    };

    const btnActive = {
        ...btnBase,
        backgroundColor: "#1e40af", // bg-blue-700
        color: "#ffffff",
        borderColor: "#1e40af"
    };

    return (
        <div style={card}>
            <p style={text}>
                Showing 0 of 0 Reports
            </p>

            <div style={btnGroup}>
                <button
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    style={btnBase}
                >
                    Previous
                </button>

                <button
                    style={btnActive}
                >
                    1
                </button>

                <button
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    style={btnBase}
                >
                    Next
                </button>
            </div>
        </div>
    );
}