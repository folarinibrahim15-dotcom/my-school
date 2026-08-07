import React, { useEffect, useState } from "react";
import { HiXMark, HiPencilSquare } from "react-icons/hi2";
import { useUpdateFinanceMutation } from "../../../../../redux/api/financeApi";

export default function EditFinanceModal({
    open,
    finance,
    onClose,
}) {
    const [updateFinance, { isLoading }] = useUpdateFinanceMutation();

    const [formData, setFormData] = useState({
        receiptNumber: "",
        studentName: "",
        className: "",
        paymentType: "",
        amount: "",
        paymentMethod: "",
        paymentDate: "",
        status: "",
        remarks: "",
    });

    useEffect(() => {
        if (finance) {
            setFormData({
                receiptNumber: finance.receiptNumber || "",
                studentName: finance.studentName || "",
                className: finance.className || "",
                paymentType: finance.paymentType || "",
                amount: finance.amount || "",
                paymentMethod: finance.paymentMethod || "",
                paymentDate: finance.paymentDate
                  ? finance.paymentDate.substring(0, 10)
                    : "",
                status: finance.status || "",
                remarks: finance.remarks || "",
            });
        }
    }, [finance]);

    const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFinance({
                id: finance._id,
                data: {
                  ...formData,
                    amount: Number(formData.amount),
                },
            }).unwrap();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    if (!open ||!finance) return null;

    const inputStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem",
        padding: "0.875rem 1rem",
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit"
    };

    const inputDisabled = {
      ...inputStyle,
        backgroundColor: "#f8fafc",
        color: "#64748b",
        cursor: "not-allowed"
    };

    const focusHandlers = {
        onFocus: (e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
        },
        onBlur: (e) => {
            e.target.style.borderColor = "#cbd5e1";
            e.target.style.boxShadow = "none";
        }
    };

    const buttonPrimary = {
        backgroundColor: isLoading? "#86efac" : "#16a34a", // green-600
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: "600",
        cursor: isLoading? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: isLoading? 0.7 : 1,
        boxShadow: isLoading? "none" : "0 4px 14px rgba(22, 163, 74, 0.25)",
        fontSize: "0.95rem",
        width: "100%",
        gridColumn: "1 / -1" // col-span-2
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
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
                    borderRadius: "1.5rem",
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)",
                    width: "100%",
                    maxWidth: "48rem", // max-w-3xl
                    padding: "clamp(20px, 4vw, 32px)",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <HiPencilSquare size={28} style={{ color: "#16a34a" }} />
                        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                            Edit Payment
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
                            fontSize: "1.5rem",
                            lineHeight: 1,
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        <HiXMark size={24} style={{ color: "#334155" }} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // 1 col mobile, 2 col desktop
                        gap: "1rem"
                    }}
                >
                    <input
                        name="receiptNumber"
                        value={formData.receiptNumber}
                        onChange={handleChange}
                        placeholder="Receipt Number"
                        style={inputStyle}
                        {...focusHandlers}
                    />

                    <input
                        name="studentName"
                        value={formData.studentName}
                        readOnly
                        placeholder="Student Name"
                        style={inputDisabled}
                    />

                    <input
                        name="className"
                        value={formData.className}
                        readOnly
                        placeholder="Class"
                        style={inputDisabled}
                    />

                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        style={inputStyle}
                        {...focusHandlers}
                    >
                        <option>School Fees</option>
                        <option>Admission Fees</option>
                        <option>Examination Fees</option>
                        <option>Transport</option>
                        <option>Hostel</option>
                        <option>Uniform</option>
                        <option>Books</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        style={inputStyle}
                        {...focusHandlers}
                    />

                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        style={inputStyle}
                        {...focusHandlers}
                    >
                        <option>Cash</option>
                        <option>POS</option>
                        <option>Bank Transfer</option>
                        <option>Online</option>
                    </select>

                    <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        style={inputStyle}
                        {...focusHandlers}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                        {...focusHandlers}
                    >
                        <option>Pending</option>
                        <option>Paid</option>
                        <option>Failed</option>
                        <option>Refunded</option>
                    </select>

                    {/* Remarks full width */}
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Remarks"
                        rows={4}
                        style={{...inputStyle, gridColumn: "1 / -1", resize: "vertical", minHeight: "100px"}}
                        {...focusHandlers}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#15803d"; }}
                        onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#16a34a"; }}
                        style={buttonPrimary}
                    >
                        {isLoading? "Updating..." : "Update Payment"}
                    </button>
                </form>
            </div>
        </div>
    );
}