import React from "react";

export default function SystemSettings() {

    const wrapper = {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem" // space-y-6
    };

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 2rem)", // p-8 responsive
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
        marginBottom: "1.5rem" // mb-6
    };

    const row = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        paddingBottom: "0.75rem", // pb-3
        paddingTop: "0.75rem",
        gap: "1rem"
    };

    const rowLast = {
       ...row,
        borderBottom: "none",
        paddingBottom: 0
    };

    const label = {
        fontWeight: "500", // font-medium
        color: "#334155",
        fontSize: "0.95rem",
        flexShrink: 0
    };

    const value = {
        color: "#0f172a",
        fontSize: "0.95rem",
        textAlign: "right",
        wordBreak: "break-word"
    };

    const valueGreen = {
       ...value,
        color: "#16a34a",
        fontWeight: "600"
    };

    // mobile override: stack rows
    const mobileStyle = `
        @media (max-width: 640px) {
            .sys-row {
                flex-direction: column !important;
                align-items: flex-start !important;
            }
            .sys-row > span:last-child {
                text-align: left !important;
                margin-top: 0.25rem;
            }
        }
    `;

    return (
        <div style={wrapper}>
            <style>{mobileStyle}</style>

            <div style={card}>
                <h2 style={title}>
                    System Settings
                </h2>

                <div>
                    <div className="sys-row" style={row}>
                        <span style={label}>System Name</span>
                        <span style={value}>Sound Peace ERP</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>Current Version</span>
                        <span style={value}>Version 1.0.0</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>Environment</span>
                        <span style={valueGreen}>Production</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>Database</span>
                        <span style={value}>MongoDB Atlas</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>Backend</span>
                        <span style={value}>Node.js + Express</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>Frontend</span>
                        <span style={value}>React + Tailwind CSS</span>
                    </div>

                    <div className="sys-row" style={row}>
                        <span style={label}>API Status</span>
                        <span style={valueGreen}>Online</span>
                    </div>

                    <div className="sys-row" style={rowLast}>
                        <span style={label}>Last Deployment</span>
                        <span style={value}>August 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
}