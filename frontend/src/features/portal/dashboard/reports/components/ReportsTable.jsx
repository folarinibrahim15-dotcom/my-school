import React from "react";
import { useNavigate } from "react-router-dom";
import { exportToPDF } from "../../../../../utils/reportExport";

import {
    HiOutlineEye,
    HiOutlinePrinter,
    HiOutlineArrowDownTray,
} from "react-icons/hi2";

export default function ReportsTable({ payments = [] }) {
    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = (payment) => {
        const columns = ["Field", "Value"];
        const studentName = payment.student
            ? `${payment.student.firstName || ""} ${payment.student.lastName || ""} ${payment.student.otherName || ""}`.trim()
            : "Unknown";

        const rows = [
            ["Payment Reference", payment.paymentReference || "N/A"],
            ["Student", studentName],
            ["Payment Type", payment.paymentType || "N/A"],
            ["Payment Method", payment.paymentMethod || "N/A"],
            ["Amount", `₦${Number(payment.amount || 0).toLocaleString()}`],
            ["Status", payment.status || "N/A"],
            ["Payment Date", payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A"],
            ["Session", payment.academicSession || "N/A"],
            ["Term", payment.term || "N/A"]
        ];

        exportToPDF(`Payment-${payment.paymentReference}`, columns, rows);
    };

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        padding: "1.5rem", // p-6
        borderBottom: "1px solid #f1f5f9"
    };

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const tableWrap = {
        overflowX: "auto", // mobile scroll
        width: "100%"
    };

    const table = {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "900px" // forces scroll on small screens
    };

    const th = {
        padding: "1rem", // p-4
        textAlign: "left",
        backgroundColor: "#f8fafc", // bg-gray-50
        color: "#334155",
        fontSize: "0.9rem",
        fontWeight: "600",
        whiteSpace: "nowrap"
    };

    const thCenter = {...th, textAlign: "center" };

    const td = {
        padding: "1rem", // p-4
        color: "#0f172a",
        fontSize: "0.95rem",
        borderTop: "1px solid #f1f5f9"
    };

    const tdCenter = {...td, textAlign: "center" };

    const tr = {
        transition: "background-color 0.15s ease"
    };

    const amount = {
       ...td,
        fontWeight: "600"
    };

    const statusBadge = (status) => {
        const base = {
            padding: "0.375rem 0.75rem", // px-3 py-1
            borderRadius: "9999px", // rounded-full
            fontSize: "0.85rem",
            fontWeight: "500",
            display: "inline-block"
        };
        if (status === "Successful") return {...base, backgroundColor: "#dcfce7", color: "#15803d" };
        if (status === "Pending") return {...base, backgroundColor: "#fef9c3", color: "#a16207" };
        return {...base, backgroundColor: "#fee2e2", color: "#b91c1c" };
    };

    const actionGroup = {
        display: "flex",
        justifyContent: "center",
        gap: "1rem" // gap-4
    };

    const iconBtn = {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.25rem",
        display: "flex",
        alignItems: "center",
        transition: "color 0.2s ease"
    };

    const empty = {
        textAlign: "center",
        padding: "4rem 0", // py-16
        color: "#64748b"
    };

    return (
        <div style={card}>
            <div style={header}>
                <h2 style={title}>Payment Reports</h2>
            </div>

            <div style={tableWrap}>
                <table style={table}>
                    <thead>
                        <tr>
                            <th style={th}>Reference</th>
                            <th style={th}>Student</th>
                            <th style={th}>Payment Type</th>
                            <th style={th}>Method</th>
                            <th style={th}>Amount</th>
                            <th style={th}>Status</th>
                            <th style={th}>Date</th>
                            <th style={thCenter}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={empty}>
                                    No payment data available.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr 
                                    key={payment._id} 
                                    style={tr}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                >
                                    <td style={td}>{payment.paymentReference}</td>

                                    <td style={td}>
                                        {payment.student
                                            ? `${payment.student.firstName || ""} ${payment.student.lastName || ""} ${payment.student.otherName || ""}`.trim()
                                            : "Unknown"}
                                    </td>

                                    <td style={td}>{payment.paymentType}</td>
                                    <td style={td}>{payment.paymentMethod}</td>

                                    <td style={amount}>
                                        ₦{Number(payment.amount).toLocaleString()}
                                    </td>

                                    <td style={td}>
                                        <span style={statusBadge(payment.status)}>
                                            {payment.status}
                                        </span>
                                    </td>

                                    <td style={td}>
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString()
                                            : "N/A"}
                                    </td>

                                    <td style={tdCenter}>
                                        <div style={actionGroup}>
                                            <button
                                                onClick={() => navigate(`/portal/reports/${payment._id}`)}
                                                onMouseEnter={(e) => { e.currentTarget.style.color = "#2563eb"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.color = "#334155"; }}
                                                style={iconBtn}
                                                title="View Details"
                                            >
                                                <HiOutlineEye size={20} />
                                            </button>

                                            <button
                                                onClick={handlePrint}
                                                onMouseEnter={(e) => { e.currentTarget.style.color = "#16a34a"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.color = "#334155"; }}
                                                style={iconBtn}
                                                title="Print"
                                            >
                                                <HiOutlinePrinter size={20} />
                                            </button>

                                            <button
                                                onClick={() => handleDownload(payment)}
                                                onMouseEnter={(e) => { e.currentTarget.style.color = "#9333ea"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.color = "#334155"; }}
                                                style={iconBtn}
                                                title="Download Receipt"
                                            >
                                                <HiOutlineArrowDownTray size={20} />
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