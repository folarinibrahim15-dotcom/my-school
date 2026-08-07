import React, { useState, useEffect } from "react";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function ParentTable({
    parents = [],
    onEdit,
    onDelete,
}) {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    const isTiny = screenWidth < 480;

    // Auto-shrinking spacing
    const padX = isTiny ? 10 : isMobile ? 12 : isTablet ? 16 : 24;
    const padY = isTiny ? 10 : isMobile ? 12 : isTablet ? 14 : 16;
    const fontSize = isTiny ? 11 : isMobile ? 12 : isTablet ? 13 : 14;
    const imgSize = isTiny ? 40 : isMobile ? 44 : 48;

    const containerStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb", // border-gray-200
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)", // shadow-sm
        overflow: "hidden",
        margin: isMobile ? "12px" : "24px",
        width: "auto",
        boxSizing: "border-box"
    };

    const headerCell = {
        padding: `${padY}px ${padX}px`,
        textAlign: "left",
        fontSize: fontSize,
        fontWeight: "600",
        color: "#334155"
    };

    const bodyCell = {
        padding: `${padY}px ${padX}px`,
        color: "#334155",
        verticalAlign: "middle",
        fontSize: fontSize
    };

    const buttonStyle = {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "4px",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const InfoRow = ({ label, value }) => (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "10px",
                paddingBottom: "8px",
                borderBottom: "1px solid #F1F5F9"
            }}
        >
            <span style={{ color: "#64748B", fontSize: "12px", fontWeight: "600", flexShrink: 0 }}>
                {label}
            </span>
            <span style={{ color: "#0F172A", fontSize: "13px", fontWeight: "600", textAlign: "right", wordBreak: "break-word" }}>
                {value || "-"}
            </span>
        </div>
    );

    /*
    |--------------------------------------------------------------------------
    | Desktop & Tablet Layout
    |--------------------------------------------------------------------------
    */
    if (!isMobile) {
        return (
            <div style={containerStyle}>
                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "auto",
                            minWidth: isTablet ? "800px" : "100%"
                        }}
                    >
                        <thead style={{ backgroundColor: "#f8fafc" }}> {/* bg-gray-50 */}
                            <tr>
                                <th style={headerCell}>Parent</th>
                                <th style={headerCell}>Phone</th>
                                <th style={headerCell}>Relationship</th>
                                <th style={headerCell}>Occupation</th>
                                <th style={headerCell}>Students</th>
                                <th style={headerCell}>Status</th>
                                <th style={{ ...headerCell, textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        style={{
                                            textAlign: "center",
                                            padding: "3rem", // py-12
                                            color: "#64748b" // text-gray-500
                                        }}
                                    >
                                        No parents found.
                                    </td>
                                </tr>
                            ) : (
                                parents.map((parent) => (
                                    <tr
                                        key={parent._id}
                                        style={{ borderBottom: "1px solid #f1f5f9", transition: "0.25s" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                                    >
                                        <td style={{ ...bodyCell, minWidth: isTablet ? "200px" : "240px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}> {/* gap-3 */}
                                                <img
                                                    src={
                                                        parent.profilePhoto ||
                                                        `https://ui-avatars.com/api/?name=${parent.firstName}+${parent.lastName}`
                                                    }
                                                    alt="Parent"
                                                    style={{
                                                        height: imgSize,
                                                        width: imgSize,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <div style={{ minWidth: 0 }}>
                                                    <p style={{ fontWeight: "600", margin: 0, color: "#0f172a" }}>
                                                        {parent.firstName} {parent.lastName}
                                                    </p>
                                                    <p style={{ fontSize: fontSize - 1, color: "#64748b", margin: "4px 0 0 0", wordBreak: "break-all" }}>
                                                        {parent.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={bodyCell}>{parent.phoneNumber}</td>
                                        <td style={bodyCell}>{parent.relationship}</td>
                                        <td style={bodyCell}>{parent.occupation || "-"}</td>
                                        <td style={bodyCell}>{parent.students?.length || 0}</td>
                                        <td style={bodyCell}>
                                            <span
                                                style={{
                                                    padding: "4px 12px", // px-3 py-1
                                                    borderRadius: "9999px", // rounded-full
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    backgroundColor: parent.isActive ? "#dcfce7" : "#fee2e2", // green-100 : red-100
                                                    color: parent.isActive ? "#15803d" : "#b91c1c" // green-700 : red-700
                                                }}
                                            >
                                                {parent.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td style={{ ...bodyCell, textAlign: "center" }}>
                                            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}> {/* gap-3 */}
                                                <button
                                                    onClick={() => navigate(`/portal/parents/${parent._id}`)}
                                                    style={{ ...buttonStyle, color: "#2563eb" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eff6ff"; e.currentTarget.style.color = "#1d4ed8"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#2563eb"; }}
                                                >
                                                    <HiOutlineEye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => onEdit(parent)}
                                                    style={{ ...buttonStyle, color: "#16a34a" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; e.currentTarget.style.color = "#15803d"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#16a34a"; }}
                                                >
                                                    <HiOutlinePencilSquare size={20} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(parent)}
                                                    style={{ ...buttonStyle, color: "#dc2626" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; e.currentTarget.style.color = "#b91c1c"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#dc2626"; }}
                                                >
                                                    <HiOutlineTrash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Mobile Card Layout < 768px - ALL CONTENT VISIBLE
    |--------------------------------------------------------------------------
    */
    return (
        <div style={{ display: "grid", gap: "1rem", margin: "12px" }}>
            {parents.length === 0 ? (
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "1rem",
                        padding: "2.5rem",
                        textAlign: "center",
                        color: "#64748b",
                        boxShadow: "0 4px 16px rgba(15,23,42,.06)"
                    }}
                >
                    No parents found.
                </div>
            ) : (
                parents.map((parent) => (
                    <div
                        key={parent._id}
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "1rem",
                            padding: "1rem",
                            boxShadow: "0 4px 16px rgba(15,23,42,.06)",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                            <img
                                src={
                                    parent.profilePhoto ||
                                    `https://ui-avatars.com/api/?name=${parent.firstName}+${parent.lastName}`
                                }
                                alt="Parent"
                                style={{ width: "3rem", height: "3rem", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                            />
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <p style={{ margin: 0, fontWeight: "700", color: "#0f172a", fontSize: "1rem" }}>
                                    {parent.firstName} {parent.lastName}
                                </p>
                                <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.875rem", wordBreak: "break-all" }}>
                                    {parent.email}
                                </p>
                            </div>
                        </div>

                        {/* ALL Information */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.625rem" }}>
                            <InfoRow label="Phone" value={parent.phoneNumber} />
                            <InfoRow label="Relationship" value={parent.relationship} />
                            <InfoRow label="Occupation" value={parent.occupation} />
                            <InfoRow label="Students" value={parent.students?.length || 0} />
                            <div>
                                <div style={{ color: "#64748B", fontSize: "12px", marginBottom: "4px", fontWeight: "600" }}>Status</div>
                                <span
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: "9999px",
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        backgroundColor: parent.isActive ? "#dcfce7" : "#fee2e2",
                                        color: parent.isActive ? "#15803d" : "#b91c1c"
                                    }}
                                >
                                    {parent.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>

                        <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "1rem 0" }} />

                        {/* Actions */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                            <button
                                onClick={() => navigate(`/portal/parents/${parent._id}`)}
                                style={{ ...buttonStyle, color: "#2563eb" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eff6ff"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <HiOutlineEye size={20} />
                            </button>
                            <button
                                onClick={() => onEdit(parent)}
                                style={{ ...buttonStyle, color: "#16a34a" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <HiOutlinePencilSquare size={20} />
                            </button>
                            <button
                                onClick={() => onDelete(parent)}
                                style={{ ...buttonStyle, color: "#dc2626" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <HiOutlineTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}