import React from "react";

export default function AboutSystem() {

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
        padding: "clamp(24px, 5vw, 2.5rem)", // p-10 responsive
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const logo = {
        width: "7rem", // w-28
        height: "auto",
        margin: "0 auto 1.5rem auto" // mx-auto mb-6
    };

    const title = {
        fontSize: "clamp(1.5rem, 5vw, 1.875rem)", // text-3xl
        fontWeight: "700",
        color: "#1e40af", // text-blue-700
        margin: 0
    };

    const subtitle = {
        color: "#64748b", // text-gray-500
        marginTop: "0.5rem", // mt-2
        fontSize: "0.95rem"
    };

    const detailsWrap = {
        marginTop: "2.5rem", // mt-10
        display: "flex",
        flexDirection: "column",
        gap: "1rem", // space-y-4
        textAlign: "left",
        maxWidth: "48rem", // max-w-3xl
        margin: "2.5rem auto 0 auto"
    };

    const row = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        paddingBottom: "0.75rem", // pb-3
        gap: "1rem"
    };

    const rowLast = {
       ...row,
        borderBottom: "none",
        paddingBottom: 0
    };

    const label = {
        fontWeight: "600", // font-semibold
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

    // mobile override: stack rows
    const mobileStyle = `
        @media (max-width: 640px) {
            .about-row {
                flex-direction: column !important;
                align-items: flex-start !important;
            }
            .about-row > span:last-child {
                text-align: left !important;
                margin-top: 0.25rem;
            }
        }
    `;

    return (
        <div style={wrapper}>
            <style>{mobileStyle}</style>

            <div style={card}>
                <img
                    src="/logoo.png"
                    alt="School Logo"
                    style={logo}
                />

                <h1 style={title}>
                    Sound Peace ERP
                </h1>

                <p style={subtitle}>
                    School Management System
                </p>

                <div style={detailsWrap}>
                    <div className="about-row" style={row}>
                        <span style={label}>Version</span>
                        <span style={value}>1.0.0</span>
                    </div>

                    <div className="about-row" style={row}>
                        <span style={label}>Developed By</span>
                        <span style={value}>Ibrahim Folarin Olayiwola</span>
                    </div>

                    <div className="about-row" style={row}>
                        <span style={label}>Technology Stack</span>
                        <span style={value}>MERN Stack</span>
                    </div>

                    <div className="about-row" style={row}>
                        <span style={label}>Frontend</span>
                        <span style={value}>React + Tailwind CSS</span>
                    </div>

                    <div className="about-row" style={row}>
                        <span style={label}>Backend</span>
                        <span style={value}>Node.js + Express</span>
                    </div>

                    <div className="about-row" style={row}>
                        <span style={label}>Database</span>
                        <span style={value}>MongoDB Atlas</span>
                    </div>

                    <div className="about-row" style={rowLast}>
                        <span style={label}>Copyright</span>
                        <span style={value}>© 2026 Sound Peace International Schools</span>
                    </div>
                </div>
            </div>
        </div>
    );
}