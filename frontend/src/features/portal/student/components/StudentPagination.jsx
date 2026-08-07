import React from "react";
import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

export default function StudentPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const buttonStyle = {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all .25s ease",
    flexShrink: 0,
    fontWeight: 600,
    fontSize: 15,
  };

  return (
    <div
      style={{
        margin: "24px",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        boxShadow: "0 4px 14px rgba(15,23,42,.06)",
        padding: "18px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}

      <div
        style={{
          textAlign: "center",
          color: "#64748B",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        Showing page{" "}
        <strong>{currentPage}</strong> of{" "}
        <strong>{totalPages}</strong>
      </div>

      {/* Pagination */}

      <div
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "max-content",
            minWidth: "100%",
            justifyContent: "center",
          }}
        >
          {/* Previous */}

          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              ...buttonStyle,
              cursor:
                currentPage === 1
                  ? "not-allowed"
                  : "pointer",
              opacity:
                currentPage === 1 ? 0.45 : 1,
            }}
          >
            <HiChevronLeft />
          </button>

          {/* Pages */}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                ...buttonStyle,

                background:
                  page === currentPage
                    ? "#1E40AF"
                    : "#FFFFFF",

                color:
                  page === currentPage
                    ? "#FFFFFF"
                    : "#334155",

                border:
                  page === currentPage
                    ? "none"
                    : "1px solid #CBD5E1",

                boxShadow:
                  page === currentPage
                    ? "0 5px 14px rgba(30,64,175,.25)"
                    : "none",
              }}
            >
              {page}
            </button>
          ))}

          {/* Next */}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            style={{
              ...buttonStyle,
              cursor:
                currentPage === totalPages
                  ? "not-allowed"
                  : "pointer",
              opacity:
                currentPage === totalPages
                  ? 0.45
                  : 1,
            }}
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}