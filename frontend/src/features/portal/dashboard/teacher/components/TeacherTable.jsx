import React, { useState, useEffect } from "react";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/
function StatusBadge({ isActive }) {
    const background = isActive ? "#DCFCE7" : "#FEE2E2";
    const color = isActive ? "#15803D" : "#B91C1C";
    const text = isActive ? "Active" : "Inactive";

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 10px",
                borderRadius: 999,
                background,
                color,
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </span>
    );
}

/*
|--------------------------------------------------------------------------
| Action Buttons
|--------------------------------------------------------------------------
*/
function ActionButtons({ teacher, navigate, onEdit, onDelete }) {
    const buttonStyle = {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 5,
        borderRadius: 10,
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexWrap: "nowrap",
            }}
        >
            <button
                onClick={() => navigate(`/portal/teachers/${teacher._id}`)}
                style={{ ...buttonStyle, color: "#2563EB" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EFF6FF"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
                <HiOutlineEye size={20} />
            </button>
            <button
                onClick={() => onEdit(teacher)}
                style={{ ...buttonStyle, color: "#16A34A" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F0FDF4"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
                <HiOutlinePencilSquare size={20} />
            </button>
            <button
                onClick={() => onDelete(teacher)}
                style={{ ...buttonStyle, color: "#DC2626" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
                <HiOutlineTrash size={20} />
            </button>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Info Row for Mobile Cards
|--------------------------------------------------------------------------
*/
function InfoRow({ label, value }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #F1F5F9",
            }}
        >
            <span style={{ color: "#64748B", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                {label}
            </span>
            <span style={{ color: "#0F172A", fontSize: 13, fontWeight: 600, textAlign: "right", wordBreak: "break-word" }}>
                {value || "-"}
            </span>
        </div>
    );
}

export default function TeacherTable({
    teachers,
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

    const containerStyle = {
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        boxShadow: "0 4px 18px rgba(15,23,42,.06)",
        overflow: "hidden",
        margin: isMobile ? 12 : 24,
        width: "auto",
        boxSizing: "border-box",
    };

    /*
|--------------------------------------------------------------------------
| Desktop & Tablet Layout >= 768px
|--------------------------------------------------------------------------
*/
    if (!isMobile) {
        return (
            <div style={containerStyle}>
                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "auto",
                            minWidth: 1000 // ensure all 7 columns fit
                        }}
                    >
                        <thead style={{ background: "#F8FAFC" }}>
                            <tr>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Teacher</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Staff ID</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Department</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Subjects</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Phone</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Status</th>
                                <th style={{ padding: "18px 24px", textAlign: "center", fontSize: 14, fontWeight: 700, color: "#334155" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#64748B", fontWeight: 500, fontSize: 14 }}>
                                        No teachers found.
                                    </td>
                                </tr>
                            ) : (
                                teachers.map((teacher) => (
                                    <tr
                                        key={teacher._id}
                                        style={{ borderBottom: "1px solid #F1F5F9", transition: ".25s" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
                                    >
                                        <td style={{ padding: "18px 24px", minWidth: 260 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <img
                                                    src={teacher.profilePhoto || `https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}`}
                                                    alt="teacher"
                                                    style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #F1F5F9" }}
                                                />
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>
                                                        {teacher.firstName} {teacher.lastName}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: "#64748B", marginTop: 3, wordBreak: "break-all" }}>
                                                        {teacher.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{teacher.staffId}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{teacher.department}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{(teacher.subjects || []).join(", ")}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{teacher.phoneNumber}</td>
                                        <td style={{ padding: "18px 24px" }}><StatusBadge isActive={teacher.isActive} /></td>
                                        <td style={{ padding: "18px 24px", textAlign: "center" }}>
                                            <ActionButtons teacher={teacher} navigate={navigate} onEdit={onEdit} onDelete={onDelete} />
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
| Mobile Card Layout < 768px - SHOW ALL 7 ITEMS
|--------------------------------------------------------------------------
*/
    return (
        <div style={{ display: "grid", gap: 16, margin: 12 }}>
            {teachers.length === 0 ? (
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 18, padding: 40, textAlign: "center", color: "#64748B", boxShadow: "0 4px 18px rgba(15,23,42,.06)" }}>
                    No teachers found.
                </div>
            ) : (
                teachers.map((teacher) => (
                    <div key={teacher._id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 18, padding: 16, boxShadow: "0 4px 18px rgba(15,23,42,.06)", width: "100%", boxSizing: "border-box" }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <img
                                src={teacher.profilePhoto || `https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}`}
                                alt="Teacher"
                                style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #F1F5F9" }}
                            />
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <h3 style={{ margin: 0, color: "#0F172A", fontSize: 16, fontWeight: 700, wordBreak: "break-word" }}>
                                    {teacher.firstName} {teacher.lastName}
                                </h3>
                                <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 13, wordBreak: "break-all" }}>{teacher.email}</p>
                            </div>
                        </div>

                        {/* ALL 7 Information */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                            <InfoRow label="Staff ID" value={teacher.staffId} />
                            <InfoRow label="Department" value={teacher.department} />
                            <InfoRow label="Subjects" value={(teacher.subjects || []).join(", ")} />
                            <InfoRow label="Phone" value={teacher.phoneNumber} />
                            <div>
                                <div style={{ color: "#64748B", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Status</div>
                                <StatusBadge isActive={teacher.isActive} />
                            </div>
                        </div>

                        <div style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }} />
                        <ActionButtons teacher={teacher} navigate={navigate} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                ))
            )}
        </div>
    );
}