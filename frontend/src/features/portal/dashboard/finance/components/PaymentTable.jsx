import React from "react";
import { useNavigate } from "react-router-dom";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";

export default function PaymentTable({
    payments = [],
    onEdit,
    onDelete,
}) {
    const navigate = useNavigate();

    const getStatusStyle = (status) => {
        const map = {
            Paid: { bg: "#dcfce7", color: "#15803d" }, // green
            Pending: { bg: "#fef9c3", color: "#a16207" }, // yellow
            Failed: { bg: "#fee2e2", color: "#b91c1c" }, // red
            Refunded: { bg: "#dbeafe", color: "#1d4ed8" }, // blue
        };
        return map[status] || { bg: "#f1f5f9", color: "#334155" };
    };

    const actionButton = (color) => ({
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        color: color,
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem", // rounded-2xl
                border: "1px solid #e5e7eb", // border-gray-200
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
                overflow: "hidden"
            }}
        >
            {/* DESKTOP TABLE */}
            <div style={{ display: "block" }} className="desktop-table">
                <div style={{ overflowX: "auto" }}>
                    <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr>
                                {["Student", "Receipt No.", "Payment Type", "Amount", "Method", "Date", "Status", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: "1rem 1.5rem", // px-6 py-4
                                            textAlign: h === "Actions"? "center" : "left",
                                            fontSize: "0.875rem", // text-sm
                                            fontWeight: "600", // font-semibold
                                            color: "#334155"
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        style={{
                                            textAlign: "center",
                                            padding: "2.5rem", // py-10
                                            color: "#64748b" // text-gray-500
                                        }}
                                    >
                                        No payment records found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => {
                                    const status = getStatusStyle(payment.status);
                                    return (
                                        <tr
                                            key={payment._id}
                                            style={{
                                                borderBottom: "1px solid #f1f5f9"
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                                        >
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <div>
                                                    <p style={{ fontWeight: "600", margin: 0, color: "#0f172a" }}>
                                                        {payment.studentName}
                                                    </p>
                                                    <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
                                                        {payment.className}
                                                    </p>
                                                </div>
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem", color: "#334155" }}>{payment.receiptNumber}</td>
                                            <td style={{ padding: "1rem 1.5rem", color: "#334155" }}>{payment.paymentType}</td>
                                            <td style={{ padding: "1rem 1.5rem", fontWeight: "600", color: "#0f172a" }}>
                                                ₦{Number(payment.amount || 0).toLocaleString()}
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem", color: "#334155" }}>{payment.paymentMethod}</td>
                                            <td style={{ padding: "1rem 1.5rem", color: "#334155" }}>
                                                {payment.paymentDate? new Date(payment.paymentDate).toLocaleDateString() : "-"}
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <span
                                                    style={{
                                                        padding: "0.25rem 0.75rem", // px-3 py-1
                                                        borderRadius: "9999px", // rounded-full
                                                        fontSize: "0.75rem", // text-xs
                                                        fontWeight: "600", // font-semibold
                                                        backgroundColor: status.bg,
                                                        color: status.color
                                                    }}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                                                    <button
                                                        onClick={() => navigate(`/portal/finance/${payment._id}`)}
                                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eff6ff"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                        style={actionButton("#2563eb")}
                                                        title="View"
                                                    >
                                                        <HiOutlineEye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => onEdit?.(payment)}
                                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                        style={actionButton("#16a34a")}
                                                        title="Edit"
                                                    >
                                                        <HiOutlinePencilSquare size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete?.(payment)}
                                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                        style={actionButton("#dc2626")}
                                                        title="Delete"
                                                    >
                                                        <HiOutlineTrash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile-cards" style={{ display: "none", padding: "1rem", gap: "1rem", flexDirection: "column" }}>
                {payments.length === 0? (
                    <div style={{ textAlign: "center", padding: "2.5rem", color: "#64748b" }}>
                        No payment records found.
                    </div>
                ) : (
                    payments.map((payment) => {
                        const status = getStatusStyle(payment.status);
                        return (
                            <div
                                key={payment._id}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "1rem",
                                    padding: "1rem",
                                    backgroundColor: "#ffffff"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                                    <div>
                                        <p style={{ fontWeight: "700", fontSize: "1rem", margin: 0, color: "#0f172a" }}>
                                            {payment.studentName}
                                        </p>
                                        <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
                                            {payment.className} • {payment.receiptNumber}
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "9999px",
                                            fontSize: "0.75rem",
                                            fontWeight: "600",
                                            backgroundColor: status.bg,
                                            color: status.color
                                        }}
                                    >
                                        {payment.status}
                                    </span>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                                    <div>
                                        <p style={{ color: "#64748b", margin: 0 }}>Amount</p>
                                        <p style={{ fontWeight: "700", margin: "0.25rem 0 0 0", color: "#15803d", fontSize: "1.125rem" }}>
                                            ₦{Number(payment.amount || 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#64748b", margin: 0 }}>Type</p>
                                        <p style={{ fontWeight: "600", margin: "0.25rem 0 0 0", color: "#0f172a" }}>{payment.paymentType}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#64748b", margin: 0 }}>Method</p>
                                        <p style={{ fontWeight: "600", margin: "0.25rem 0 0 0", color: "#0f172a" }}>{payment.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#64748b", margin: 0 }}>Date</p>
                                        <p style={{ fontWeight: "600", margin: "0.25rem 0 0 0", color: "#0f172a" }}>
                                            {payment.paymentDate? new Date(payment.paymentDate).toLocaleDateString() : "-"}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem" }}>
                                    <button
                                        onClick={() => navigate(`/portal/finance/${payment._id}`)}
                                        style={{...actionButton("#2563eb"), flex: 1, border: "1px solid #bfdbfe", backgroundColor: "#eff6ff"}}
                                    >
                                        <HiOutlineEye size={18} /> View
                                    </button>
                                    <button
                                        onClick={() => onEdit?.(payment)}
                                        style={{...actionButton("#16a34a"), flex: 1, border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4"}}
                                    >
                                        <HiOutlinePencilSquare size={18} /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(payment)}
                                        style={{...actionButton("#dc2626"), flex: 1, border: "1px solid #fecaca", backgroundColor: "#fef2f2"}}
                                    >
                                        <HiOutlineTrash size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Responsive Toggle */}
            <style>{`
                @media (max-width: 767px) {
                   .desktop-table { display: none!important; }
                   .mobile-cards { display: flex!important; }
                }
            `}</style>
        </div>
    );
}