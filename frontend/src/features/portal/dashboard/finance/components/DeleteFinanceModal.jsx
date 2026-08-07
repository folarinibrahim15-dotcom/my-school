import React from "react";
import { HiXMark, HiExclamationTriangle } from "react-icons/hi2";
import { useDeleteFinanceMutation } from "../../../../../redux/api/financeApi";

export default function DeleteFinanceModal({
    open,
    onClose,
    finance,
}) {
    const [deletePayment, { isLoading }] = useDeleteFinanceMutation();

    if (!open || !finance) return null;

    const handleDelete = async () => {
        try {
            await deletePayment(finance._id).unwrap();
            onClose();
        } catch (error) {
            console.error(error);
            alert(error?.data?.message || "Unable to delete payment.");
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: "clamp(12px, 4vw, 24px)"
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1.5rem", // rounded-2xl
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)",
                    width: "100%",
                    maxWidth: "32rem", // max-w-lg
                    overflow: "hidden"
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1.5rem", // px-6 py-4
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <HiExclamationTriangle size={24} style={{ color: "#dc2626" }} />
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                            Delete Payment
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.75rem",
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        <HiXMark size={20} style={{ color: "#334155" }} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                        Are you sure you want to permanently delete this payment?
                    </p>

                    {/* Info Card */}
                    <div
                        style={{
                            backgroundColor: "#f8fafc",
                            borderRadius: "1rem", // rounded-xl
                            padding: "1.25rem", // p-5
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500", color: "#64748b" }}>Receipt</span>
                            <span style={{ fontWeight: "600", color: "#0f172a" }}>{finance.receiptNumber}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500", color: "#64748b" }}>Student</span>
                            <span style={{ fontWeight: "600", color: "#0f172a" }}>{finance.studentName}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500", color: "#64748b" }}>Payment Type</span>
                            <span style={{ fontWeight: "600", color: "#0f172a" }}>{finance.paymentType}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500", color: "#64748b" }}>Amount</span>
                            <span style={{ fontWeight: "700", color: "#15803d", fontSize: "1.125rem" }}>
                                ₦{Number(finance.amount).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Warning */}
                    <div
                        style={{
                            backgroundColor: "#fef2f2",
                            color: "#b91c1c",
                            borderRadius: "0.75rem",
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            fontWeight: "500"
                        }}
                    >
                        This action cannot be undone.
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        borderTop: "1px solid #e5e7eb",
                        padding: "1rem 1.5rem", // px-6 py-4
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.75rem"
                    }}
                >
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                        style={{
                            padding: "0.625rem 1.25rem", // px-5 py-2
                            borderRadius: "0.75rem",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            color: "#334155",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#b91c1c"; }}
                        onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#dc2626"; }}
                        style={{
                            padding: "0.625rem 1.25rem",
                            borderRadius: "0.75rem",
                            backgroundColor: isLoading? "#fca5a5" : "#dc2626", // red-600
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "600",
                            cursor: isLoading? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                            opacity: isLoading? 0.7 : 1,
                            boxShadow: isLoading? "none" : "0 4px 14px rgba(220, 38, 38, 0.25)"
                        }}
                    >
                        {isLoading? "Deleting..." : "Delete Payment"}
                    </button>
                </div>
            </div>
        </div>
    );
}