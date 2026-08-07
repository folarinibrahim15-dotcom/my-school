import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function FinancePagination({
    page,
    pages,
    setPage,
}) {
    if (pages <= 1) return null;

    const baseButton = {
        padding: "0.625rem 1rem", // px-4 py-2
        borderRadius: "0.75rem", // rounded-lg
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.9rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    };

    const activeButton = {
        ...baseButton,
        backgroundColor: "#1d4ed8", // bg-blue-700
        color: "#ffffff",
        borderColor: "#1d4ed8",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
    };

    const disabledButton = {
        ...baseButton,
        opacity: 0.4,
        cursor: "not-allowed"
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1.5rem", // mt-6
                flexDirection: "column", // mobile: column
                gap: "1rem"
            }}
        >
            {/* Previous Button */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                onMouseEnter={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                onMouseLeave={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                style={page === 1? disabledButton : baseButton}
            >
                <HiChevronLeft size={18} />
                Previous
            </button>

            {/* Page Numbers */}
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem", // gap-2
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
            >
                {Array.from({ length: pages }, (_, index) => {
                    const pageNum = index + 1;
                    const isActive = page === pageNum;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                            style={isActive? activeButton : baseButton}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                onMouseEnter={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                onMouseLeave={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                style={page === pages? disabledButton : baseButton}
            >
                Next
                <HiChevronRight size={18} />
            </button>

            {/* Desktop Layout Override */}
            <style>{`
                @media (min-width: 768px) {
                    .finance-pagination { flex-direction: row!important; }
                }
            `}</style>
            <script dangerouslySetInnerHTML={{__html: `
                document.currentScript.previousElementSibling.classList.add('finance-pagination');
            `}} />
        </div>
    );
}