import React, { useState } from "react";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaBell,
} from "react-icons/fa";

export default function ParentQuickActions() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const actions = [
    {
      title: "My Children",
      icon: <FaUserGraduate />,
      color: "#2563eb", // bg-blue-600
    },
    {
      title: "School Fees",
      icon: <FaMoneyBillWave />,
      color: "#16a34a", // bg-green-600
    },
    {
      title: "Attendance",
      icon: <FaClipboardCheck />,
      color: "#eab308", // bg-yellow-500
    },
    {
      title: "Notifications",
      icon: <FaBell />,
      color: "#dc2626", // bg-red-600
    },
  ];

  const card = {
    backgroundColor: "#ffffff",
    borderRadius: "1.5rem", // rounded-2xl
    boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-md premium
    border: "1px solid #f1f5f9",
    padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const title = {
    fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
    fontWeight: "700",
    color: "#1e293b", // text-slate-800
    margin: 0,
    marginBottom: "1.25rem" // mb-5
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // mobile: 2 cols
    gap: "1rem" // gap-4
  };

  const gridResponsive = `
    @media (min-width: 1024px) {
        .parent-actions-grid { grid-template-columns: repeat(4, 1fr) !important; } /* lg: 4 cols */
    }
  `;

  const buttonBase = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.75rem", // rounded-xl
    padding: "1.25rem", // p-5
    border: "1px solid #e2e8f0", // border
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    boxSizing: "border-box"
  };

  const iconCircle = (bg) => ({
    backgroundColor: bg,
    color: "#ffffff",
    width: "3.5rem", // w-14
    height: "3.5rem", // h-14
    borderRadius: "50%", // rounded-full
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem", // text-2xl
    marginBottom: "0.75rem", // mb-3
    flexShrink: 0
  });

  const actionLabel = {
    fontSize: "0.875rem", // text-sm
    fontWeight: "600",
    color: "#334155", // text-slate-700
    textAlign: "center",
    lineHeight: 1.4
  };

  return (
    <>
      <style>{gridResponsive}</style>
      <div style={card}>
        <h2 style={title}>
          Quick Actions
        </h2>

        <div className="parent-actions-grid" style={grid}>
          {actions.map((action, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  ...buttonBase,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered 
                    ? "0 12px 28px rgba(15, 23, 42, 0.1)" 
                    : "0 1px 3px rgba(15, 23, 42, 0.05)",
                  borderColor: isHovered ? "#bfdbfe" : "#e2e8f0"
                }}
              >
                <div style={iconCircle(action.color)}>
                  {action.icon}
                </div>

                <span style={actionLabel}>
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}