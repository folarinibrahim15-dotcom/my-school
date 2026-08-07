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
function StatusBadge({ status }) {
    const getColors = () => {
        switch (status) {
            case "Pending": return { bg: "#FEF9C3", color: "#A16207" };
            case "Under Review": return { bg: "#DBEAFE", color: "#1D4ED8" };
            case "Approved": return { bg: "#DCFCE7", color: "#15803D" };
            case "Rejected": return { bg: "#FEE2E2", color: "#B91C1C" };
            case "Admitted": return { bg: "#F3E8FF", color: "#7C3AED" };
            default: return { bg: "#F1F5F9", color: "#334155" };
        }
    };
    const { bg, color } = getColors();

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 10px",
                borderRadius: 999,
                background: bg,
                color: color,
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
            }}
        >
            {status}
        </span>
    );
}

/*
|--------------------------------------------------------------------------
| Action Buttons
|--------------------------------------------------------------------------
*/
function ActionButtons({ admission, navigate, onEdit, onDelete }) {
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <button
                onClick={() => navigate(`/portal/admissions/${admission._id}`)}
                style={{ ...buttonStyle, color: "#2563EB" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EFF6FF"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
                <HiOutlineEye size={20} />
            </button>
            <button
                onClick={() => onEdit(admission)}
                style={{ ...buttonStyle, color: "#16A34A" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F0FDF4"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
                <HiOutlinePencilSquare size={20} />
            </button>
            <button
                onClick={() => onDelete(admission)}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, paddingBottom: 8, borderBottom: "1px solid #F1F5F9" }}>
            <span style={{ color: "#64748B", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{label}</span>
            <span style={{ color: "#0F172A", fontSize: 13, fontWeight: 600, textAlign: "right", wordBreak: "break-word" }}>{value || "-"}</span>
        </div>
    );
}

export default function AdmissionTable({
    admissions,
    loading,
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
        margin: isMobile ? 0 : 0,
        width: "100%",
        boxSizing: "border-box",
    };

    if (loading) {
        return (
            <div style={{ ...containerStyle, padding: 48, textAlign: "center", color: "#64748B", fontWeight: 500 }}>
                Loading Admissions...
            </div>
        );
    }

    /*
|--------------------------------------------------------------------------
| Desktop & Tablet Layout >= 768px
|--------------------------------------------------------------------------
*/
    if (!isMobile) {
        return (
            <div style={containerStyle}>
                <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto", minWidth: 1100 }}>
                        <thead style={{ background: "#F8FAFC" }}>
                            <tr>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Applicant</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Application No.</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Email</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Parent</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Class</th>
                                <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 14, fontWeight: 700, color: "#334155" }}>Status</th>
                                <th style={{ padding: "18px 24px", textAlign: "center", fontSize: 14, fontWeight: 700, color: "#334155" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admissions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: 60, textAlign: "center", color: "#64748B", fontWeight: 500, fontSize: 14 }}>
                                        No admission applications found.
                                    </td>
                                </tr>
                            ) : (
                                admissions.map((admission) => (
                                    <tr
                                        key={admission._id}
                                        style={{ borderBottom: "1px solid #F1F5F9", transition: ".25s" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
                                    >
                                        <td style={{ padding: "18px 24px", minWidth: 260 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <img
                                                    src={admission.documents?.[0]?.url || `https://ui-avatars.com/api/?name=${admission.firstName}+${admission.lastName}`}
                                                    alt={admission.firstName}
                                                    style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #F1F5F9" }}
                                                />
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>
                                                        {admission.firstName} {admission.lastName}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: "#64748B", marginTop: 3 }}>
                                                        {admission.phoneNumber}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{admission.applicationNumber}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155", wordBreak: "break-all" }}>{admission.email}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{admission.parentName}</td>
                                        <td style={{ padding: "18px 24px", fontSize: 14, color: "#334155" }}>{admission.classApplyingFor}</td>
                                        <td style={{ padding: "18px 24px" }}><StatusBadge status={admission.status} /></td>
                                        <td style={{ padding: "18px 24px", textAlign: "center" }}>
                                            <ActionButtons admission={admission} navigate={navigate} onEdit={onEdit} onDelete={onDelete} />
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
        <div style={{ display: "grid", gap: 16 }}>
            {admissions.length === 0 ? (
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 18, padding: 40, textAlign: "center", color: "#64748B", boxShadow: "0 4px 18px rgba(15,23,42,.06)" }}>
                    No admission applications found.
                </div>
            ) : (
                admissions.map((admission) => (
                    <div key={admission._id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 18, padding: 16, boxShadow: "0 4px 18px rgba(15,23,42,.06)", width: "100%", boxSizing: "border-box" }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <img
                                src={admission.documents?.[0]?.url || `https://ui-avatars.com/api/?name=${admission.firstName}+${admission.lastName}`}
                                alt={admission.firstName}
                                style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #F1F5F9" }}
                            />
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <h3 style={{ margin: 0, color: "#0F172A", fontSize: 16, fontWeight: 700, wordBreak: "break-word" }}>
                                    {admission.firstName} {admission.lastName}
                                </h3>
                                <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: 13 }}>{admission.phoneNumber}</p>
                            </div>
                        </div>

                        {/* ALL 7 Information */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                            <InfoRow label="Application No." value={admission.applicationNumber} />
                            <InfoRow label="Email" value={admission.email} />
                            <InfoRow label="Parent" value={admission.parentName} />
                            <InfoRow label="Class" value={admission.classApplyingFor} />
                            <div>
                                <div style={{ color: "#64748B", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Status</div>
                                <StatusBadge status={admission.status} />
                            </div>
                        </div>

                        <div style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }} />
                        <ActionButtons admission={admission} navigate={navigate} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                ))
            )}
        </div>
    );
}