import React from "react";
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from "react-icons/hi2";

export default function NotificationPagination({
    page = 1,
    pages = 1,
    total = 0,
    setFilters,
}) {
    const previousPage = () => {
        if (page > 1) {
            setFilters((prev) => ({
               ...prev,
                page: page - 1,
            }));
        }
    };

    const nextPage = () => {
        if (page < pages) {
            setFilters((prev) => ({
               ...prev,
                page: page + 1,
            }));
        }
    };

    const wrapper = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow premium
        border: "1px solid #e5e7eb",
        padding: "clamp(16px, 4vw, 1.25rem)", // p-5 responsive
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column", // mobile: column
        gap: "1rem",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const totalText = {
        color: "#64748b", // text-gray-600
        fontSize: "0.95rem",
        margin: 0
    };

    const totalNumber = {
        fontWeight: "700",
        color: "#0f172a",
        marginLeft: "0.5rem" // ml-2
    };

    const controlsContainer = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem", // gap-3
        flexWrap: "wrap",
        justifyContent: "center"
    };

    const pageInfo = {
        fontWeight: "700",
        color: "#0f172a",
        fontSize: "0.95rem",
        whiteSpace: "nowrap"
    };

    const btnBase = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-lg
        padding: "0.625rem 1rem", // px-4 py-2
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease"
    };

    const btnDisabled = {
       ...btnBase,
        opacity: 0.5,
        cursor: "not-allowed"
    };

    return (
        <div style={wrapper} className="notification-pagination">
            <p style={totalText}>
                Total Notifications:
                <span style={totalNumber}>
                    {total}
                </span>
            </p>

            <div style={controlsContainer}>
                <button
                    onClick={previousPage}
                    disabled={page === 1}
                    onMouseEnter={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                    onMouseLeave={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    style={page === 1? btnDisabled : btnBase}
                >
                    <HiOutlineChevronLeft size={18} />
                    Previous
                </button>

                <span style={pageInfo}>
                    Page {page} of {pages}
                </span>

                <button
                    onClick={nextPage}
                    disabled={page === pages}
                    onMouseEnter={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                    onMouseLeave={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    style={page === pages? btnDisabled : btnBase}
                >
                    Next
                    <HiOutlineChevronRight size={18} />
                </button>
            </div>

            {/* Responsive: row on desktop */}
            <style>{`
                @media (min-width: 640px) {
                    .notification-pagination { flex-direction: row!important; }
                }
            `}</style>
        </div>
    );
}