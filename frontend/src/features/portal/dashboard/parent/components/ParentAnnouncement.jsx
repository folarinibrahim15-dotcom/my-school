import React, { useState } from "react";
import { FaBullhorn, FaCalendarAlt } from "react-icons/fa";

export default function ParentAnnouncements() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const announcements = [
    {
      title: "Second Term Resumption",
      date: "15 September 2026",
    },
    {
      title: "PTA Meeting",
      date: "21 September 2026",
    },
    {
      title: "School Fees Reminder",
      date: "30 September 2026",
    },
  ];

  const section = {
    backgroundColor: "#ffffff",
    borderRadius: "1.5rem", // rounded-2xl to match system
    boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
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

  const list = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem" // space-y-4
  };

  const cardBase = {
    border: "1px solid #e2e8f0", // border
    borderRadius: "0.75rem", // rounded-xl
    padding: "1rem", // p-4
    backgroundColor: "#ffffff",
    transition: "all 0.25s ease",
    cursor: "default"
  };

  const headerRow = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem" // gap-3
  };

  const announceTitle = {
    fontWeight: "600",
    color: "#1e293b", // text-slate-800
    fontSize: "1rem",
    margin: 0
  };

  const dateRow = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem", // gap-2
    color: "#64748b", // text-gray-500
    fontSize: "0.875rem", // text-sm
    marginTop: "0.5rem" // mt-2
  };

  return (
    <div style={section}>
      <h2 style={title}>
        Latest Announcements
      </h2>

      <div style={list}>
        {announcements.map((item, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                ...cardBase,
                backgroundColor: isHovered ? "#f8fafc" : "#ffffff", // hover:bg-slate-50
                borderColor: isHovered ? "#bfdbfe" : "#e2e8f0",
                boxShadow: isHovered ? "0 4px 14px rgba(37, 99, 235, 0.08)" : "none"
              }}
            >
              <div style={headerRow}>
                <FaBullhorn size={18} color="#1d4ed8" /> {/* text-blue-700 */}
                <h3 style={announceTitle}>
                  {item.title}
                </h3>
              </div>

              <div style={dateRow}>
                <FaCalendarAlt size={14} />
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}