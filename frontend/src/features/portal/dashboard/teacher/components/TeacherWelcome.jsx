import React from "react";
import { FiBookOpen } from "react-icons/fi";

export default function TeacherWelcome() {

    const section = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        flexDirection: "column", // mobile: stack
        gap: "1.5rem", // gap-6
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid #f1f5f9",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const sectionDesktop = {
        "@media (min-width: 768px)": {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    };

    const textWrap = {
        flex: "1 1 100%",
        minWidth: 0
    };

    const title = {
        fontSize: "clamp(1.5rem, 4vw, 1.875rem)", // text-2xl sm:text-3xl
        fontWeight: "700",
        color: "#1e293b", // text-slate-800
        fontFamily: "Candara, 'Segoe UI', sans-serif",
        lineHeight: 1.2,
        margin: 0
    };

    const paragraph = {
        marginTop: "0.5rem", // mt-2
        color: "#64748b", // text-slate-500
        fontSize: "clamp(0.875rem, 2.5vw, 1rem)", // text-sm sm:text-base
        lineHeight: 1.6
    };

    const highlightRow = {
        marginTop: "1rem", // mt-4
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        color: "#1d4ed8", // text-blue-700
        fontWeight: "500"
    };

    const iconArea = {
        display: "none", // hidden on mobile
        height: "7rem", // h-28
        width: "7rem", // w-28
        borderRadius: "50%", // rounded-full
        backgroundColor: "#eff6ff", // bg-blue-50
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
    };

    const iconAreaDesktop = {
        "@media (min-width: 768px)": {
            display: "flex" // md:flex
        }
    };

    return (
        <section style={section}>
            {/* Text */}
            <div style={textWrap}>
                <h2 style={title}>
                    Welcome back, Mr Salam👋
                </h2>

                <p style={paragraph}>
                    Manage your classes, monitor student progress,
                    and continue inspiring academic excellence.
                </p>

                <div style={highlightRow}>
                    <FiBookOpen size={20} />
                    <span>
                        Your classroom makes a difference!
                    </span>
                </div>
            </div>

            {/* Icon Area */}
            <div style={{ ...iconArea, display: window.innerWidth >= 768 ? "flex" : "none" }}>
                <FiBookOpen size={45} color="#1d4ed8" />
            </div>
        </section>
    );
}