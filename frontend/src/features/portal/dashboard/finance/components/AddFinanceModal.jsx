import React, { useState } from "react";
import { HiXMark, HiCurrencyDollar } from "react-icons/hi2";
import { useCreateFinanceMutation } from "../../../../../redux/api/financeApi";
import { useGetStudentsQuery } from "../../../../../redux/api/studentApi";

export default function AddFinanceModal({ open, onClose }) {
  const [createFinance, { isLoading }] = useCreateFinanceMutation();

  const { data: studentsData } = useGetStudentsQuery({
    page: 1,
    limit: 1000,
  });

  const students = studentsData?.data || [];

  const [formData, setFormData] = useState({
    receiptNumber: "",
    student: "",
    studentName: "",
    className: "",
    paymentType: "School Fees",
    amount: "",
    paymentMethod: "Cash",
    paymentDate: new Date().toISOString().split("T")[0],
    status: "Paid",
    remarks: "",
  });

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const selectedStudent = students.find((student) => student._id === studentId);
    if (!selectedStudent) return;

    setFormData((prev) => ({
     ...prev,
      student: selectedStudent._id,
      studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
      className: selectedStudent.className || selectedStudent.class || "",
    }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
     ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {...formData, amount: Number(formData.amount) };
    console.log("Submitting Finance Payload:", payload);
    try {
      const response = await createFinance(payload).unwrap();
      console.log("Finance Created:", response);
      onClose();
    } catch (error) {
      console.log("Finance Error:", error);
    }
  };

  if (!open) return null;

  const inputStyle = {
    border: "1px solid #cbd5e1",
    borderRadius: "0.75rem", // rounded-xl
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
    backgroundColor: isLoading? "#93c5fd" : "#1d4ed8",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: "600",
    cursor: isLoading? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: isLoading? 0.7 : 1,
    boxShadow: isLoading? "none" : "0 4px 14px rgba(29, 78, 216, 0.25)",
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
          borderRadius: "1.5rem", // rounded-2xl
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
            <HiCurrencyDollar size={28} style={{ color: "#1d4ed8" }} />
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              Add Finance Record
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
            gap: "1rem" // gap-4
          }}
        >
          <input
            name="receiptNumber"
            placeholder="Receipt Number"
            value={formData.receiptNumber}
            onChange={handleChange}
            style={inputStyle}
            {...focusHandlers}
            required
          />

          <select
            value={formData.student}
            onChange={handleStudentChange}
            style={inputStyle}
            {...focusHandlers}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>

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
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            style={inputStyle}
            {...focusHandlers}
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={inputStyle}
            {...focusHandlers}
          >
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>POS</option>
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
            onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1e40af"; }}
            onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
            style={buttonPrimary}
          >
            {isLoading? "Saving..." : "Save Finance Record"}
          </button>
        </form>
      </div>
    </div>
  );
}