import React, { useEffect, useState } from "react";
import {
    HiOutlineFunnel,
    HiOutlineArrowDownTray,
    HiOutlinePrinter,
} from "react-icons/hi2";
import {
    exportToPDF,
    exportToExcel,
    printReport,
} from "../../../../../utils/reportExport";

export default function ReportsToolbar({
    filters = {},
    setFilters,
    payments = [],
}) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters((prev) => ({
               ...prev,
                search: searchTerm,
            }));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, setFilters]);

    const handleChange = (e) => {
        setFilters((prev) => ({
           ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleExportPDF = () => {
        const columns = [
            "Reference", "Student", "Payment Type", "Method", "Amount", "Status", "Date",
        ];
        const rows = payments.map((payment) => [
            payment.paymentReference || "N/A",
            payment.student
                ? `${payment.student.firstName} ${payment.student.lastName}${
                      payment.student.otherName ? ` ${payment.student.otherName}` : ""
                  }`
                : "Unknown",
            payment.paymentType || "N/A",
            payment.paymentMethod || "N/A",
            `₦${Number(payment.amount || 0).toLocaleString()}`,
            payment.status,
            payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "",
        ]);
        exportToPDF("Payment Report", columns, rows);
    };

    const handleExportExcel = () => {
        const data = payments.map((payment) => ({
            Reference: payment.paymentReference,
            Student: payment.student
                ? `${payment.student.firstName} ${payment.student.lastName}${
                      payment.student.otherName ? ` ${payment.student.otherName}` : ""
                  }`
                : "Unknown",
            PaymentType: payment.paymentType,
            PaymentMethod: payment.paymentMethod,
            Amount: payment.amount,
            Status: payment.status,
            PaymentDate: payment.paymentDate
                ? new Date(payment.paymentDate).toLocaleDateString()
                : "",
        }));
        exportToExcel("Payment Report", data);
    };

    const handlePrint = () => {
        printReport();
    };

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(18px, 4vw, 1.5rem)", // p-6 responsive
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "1rem", // space-y-4
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem" // gap-2
    };

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr", // default mobile = 1 column vertical
        gap: "1rem" // gap-4
    };

    const gridDesktop = `
        @media (min-width: 768px) {
            .toolbar-grid {
                grid-template-columns: repeat(2, 1fr) !important; /* md: 2 columns */
            }
        }
        @media (min-width: 1024px) {
            .toolbar-grid {
                grid-template-columns: repeat(5, 1fr) !important; /* lg: 5 columns */
            }
        }
    `;

    const inputBase = {
        width: "100%",
        border: "1px solid #cbd5e1",
        borderRadius: "0.5rem", // rounded-lg
        padding: "0.875rem 1rem", // p-3
        fontSize: "0.95rem",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease"
    };

    const btnGroup = {
        display: "flex",
        flexDirection: "column", // default mobile vertical
        gap: "0.75rem" // gap-3
    };

    const btnGroupDesktop = `
        @media (min-width: 768px) {
            .reports-btn-group {
                flex-direction: row !important;
                justify-content: flex-end !important;
            }
            .reports-btn-group > button {
                flex: 0 1 auto !important;
            }
        }
    `;

    const btnBase = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem", // gap-2
        cursor: "pointer",
        padding: "0.75rem 1.25rem", // px-5 py-3 on mobile for tap target
        borderRadius: "0.5rem", // rounded-lg
        border: "none",
        fontWeight: "600",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        width: "100%" // full width on mobile
    };

    const btnRed = {...btnBase, backgroundColor: "#dc2626", color: "#fff" };
    const btnGreen = {...btnBase, backgroundColor: "#16a34a", color: "#fff" };
    const btnBlue = {...btnBase, backgroundColor: "#2563eb", color: "#fff" };

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

    return (
        <>
            <style>{gridDesktop}</style>
            <style>{btnGroupDesktop}</style>
            <div style={card}>

                <div style={header}>
                    <HiOutlineFunnel size={22} style={{ color: "#334155" }} />
                    <h2 style={title}>Report Filters</h2>
                </div>

                <div className="toolbar-grid" style={grid}>
                    <select
                        name="type"
                        value={filters.type || ""}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option value="">All Reports</option>
                        <option value="students">Students</option>
                        <option value="finance">Finance</option>
                        <option value="admissions">Admissions</option>
                        <option value="academic">Academic</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search payment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={inputBase}
                        {...focusHandlers}
                    />

                    <select
                        name="term"
                        value={filters.term || ""}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option value="">All Terms</option>
                        <option value="First Term">First Term</option>
                        <option value="Second Term">Second Term</option>
                        <option value="Third Term">Third Term</option>
                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate || ""}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate || ""}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    />
                </div>

                <div className="reports-btn-group" style={btnGroup}>
                    <button
                        onClick={handleExportPDF}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#b91c1c"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#dc2626"; }}
                        style={btnRed}
                    >
                        <HiOutlineArrowDownTray size={18} />
                        Export PDF
                    </button>

                    <button
                        onClick={handleExportExcel}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#16a34a"; }}
                        style={btnGreen}
                    >
                        <HiOutlineArrowDownTray size={18} />
                        Export Excel
                    </button>

                    <button
                        onClick={handlePrint}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2563eb"; }}
                        style={btnBlue}
                    >
                        <HiOutlinePrinter size={18} />
                        Print
                    </button>
                </div>
            </div>
        </>
    );
}