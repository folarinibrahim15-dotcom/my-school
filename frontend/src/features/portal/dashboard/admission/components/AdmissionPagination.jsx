import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function AdmissionPagination({
    page,
    pages,
    setPage,
}) {
    if (pages <= 1) return null;

    const buttonSecondary = {
        border: "1px solid #cbd5e1",
        padding: "0.5rem 1.25rem", // px-5 py-2
        borderRadius: "0.75rem", // rounded-xl
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        height: "40px"
    };

    const pageButtonBase = {
        width: "40px",
        height: "40px",
        borderRadius: "0.75rem",
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const pageButtonActive = {
       ...pageButtonBase,
        backgroundColor: "#1d4ed8", // bg-blue-700
        color: "#ffffff",
        border: "1px solid #1d4ed8",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2rem", // mt-8
                flexWrap: "wrap", // MOBILE WRAP
                gap: "1rem",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "1rem", // rounded-2xl
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
                padding: "1rem 1.5rem"
            }}
        >
            {/* Previous */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                onMouseEnter={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                onMouseLeave={(e) => { if(page !== 1) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                style={{
                   ...buttonSecondary,
                    opacity: page === 1? 0.5 : 1,
                    cursor: page === 1? "not-allowed" : "pointer"
                }}
            >
                <HiChevronLeft size={18} />
                Previous
            </button>

            {/* Page Numbers */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap", // WRAPS ON MOBILE
                    justifyContent: "center",
                    flex: "1 1 auto"
                }}
            >
                {Array.from({ length: pages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        onMouseEnter={(e) => {
                            if(page !== index + 1) {
                                e.currentTarget.style.backgroundColor = "#f8fafc";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if(page !== index + 1) {
                                e.currentTarget.style.backgroundColor = "#ffffff";
                            }
                        }}
                        style={page === index + 1? pageButtonActive : pageButtonBase}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                onMouseEnter={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                onMouseLeave={(e) => { if(page !== pages) e.currentTarget.style.backgroundColor = "#ffffff"; }}
                style={{
                   ...buttonSecondary,
                    opacity: page === pages? 0.5 : 1,
                    cursor: page === pages? "not-allowed" : "pointer"
                }}
            >
                Next
                <HiChevronRight size={18} />
            </button>
        </div>
    );
}