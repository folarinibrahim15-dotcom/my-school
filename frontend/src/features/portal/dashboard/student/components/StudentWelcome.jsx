import React from "react";
import { FiBookOpen } from "react-icons/fi";

export default function StudentWelcome() {

    const section = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
        border: "1px solid #f1f5f9",
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        flexDirection: "column", // mobile: stack
        gap: "1.5rem", // gap-6
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const sectionDesktop = `
        @media (min-width: 768px) {
            .student-welcome {
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
        }
    `;

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

    const iconAreaDesktop = `
        @media (min-width: 768px) {
            .welcome-icon {
                display: flex !important;
            }
        }
    `;

    return (
        <>
            <style>{sectionDesktop}</style>
            <style>{iconAreaDesktop}</style>
            <section className="student-welcome" style={section}>
                
                {/* Text Content */}
                <div style={textWrap}>
                    <h2 style={title}>
                        Welcome back, Ibrahim 👋
                    </h2>

                    <p style={paragraph}>
                        Keep learning, stay focused, and continue
                        working towards academic excellence.
                    </p>

                    <div style={highlightRow}>
                        <FiBookOpen size={20} />
                        <span>
                            Your journey to success continues!
                        </span>
                    </div>
                </div>

                {/* Illustration Area */}
                <div className="welcome-icon" style={iconArea}>
                    <FiBookOpen size={45} color="#1d4ed8" />
                </div>

            </section>
        </>
    );
}