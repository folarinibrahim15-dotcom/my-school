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

export default function NotificationToolbar({
    filters = {},
    setFilters,
    notifications = []
}) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters({
               ...filters,
                search: searchTerm
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleChange = (e) => {
        setFilters({
         ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleExportPDF = () => {
        const columns = [
            "Title",
            "Recipient",
            "Type",
            "Priority",
            "Status",
            "Date"
        ];

        const rows = notifications.map((notification) => [
            notification.title || "N/A",
            notification.recipient || "All Users",
            notification.type || "General",
            notification.priority || "Normal",
            notification.isRead? "Read" : "Unread",
            notification.createdAt
               ? new Date(notification.createdAt).toLocaleDateString()
                : ""
        ]);

        exportToPDF(
            "Notifications Report",
            columns,
            rows
        );
    };

    const handleExportExcel = () => {
        const data = notifications.map((notification) => ({
            Title: notification.title,
            Recipient: notification.recipient,
            Type: notification.type,
            Priority: notification.priority,
            Status: notification.isRead? "Read" : "Unread",
            Date: notification.createdAt
               ? new Date(notification.createdAt).toLocaleDateString()
                : ""
        }));

        exportToExcel(
            "Notifications Report",
            data
        );
    };

    const handlePrint = () => {
        printReport();
    };

    const wrapper = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // soft premium shadow
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem", // space-y-5
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem" // gap-2
    };

    const headerTitle = {
        fontSize: "clamp(1.125rem, 3vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
        lineHeight: 1.4
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // responsive: 1 -> 2 -> 5 cols
        gap: "1rem" // gap-4
    };

    const inputBase = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-lg
        padding: "0.875rem 1rem", // p-3
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        lineHeight: 1.6
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

    const actions = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.75rem", // gap-3
        flexWrap: "wrap" // mobile wraps
    };

    const btnBase = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        color: "#ffffff",
        padding: "0.625rem 1.25rem", // px-5 py-2
        borderRadius: "0.75rem", // rounded-lg
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)"
    };

    const btnBlue = {
      ...btnBase,
        backgroundColor: "#1d4ed8"
    };

    const btnGreen = {
      ...btnBase,
        backgroundColor: "#16a34a"
    };

    const btnGray = {
      ...btnBase,
        backgroundColor: "#1f2937"
    };

    return (
        <div style={wrapper}>
            <div style={header}>
                <HiOutlineFunnel size={22} style={{ color: "#334155" }} />
                <h2 style={headerTitle}>
                    Notification Filters
                </h2>
            </div>

            <div style={grid}>
                <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={inputBase}
                    {...focusHandlers}
                />

                <select
                    name="type"
                    value={filters.type || ""}
                    onChange={handleChange}
                    style={inputBase}
                    {...focusHandlers}
                >
                    <option value="">
                        All Types
                    </option>
                    <option value="General">
                        General
                    </option>
                    <option value="Finance">
                        Finance
                    </option>
                    <option value="Admission">
                        Admission
                    </option>
                    <option value="Academic">
                        Academic
                    </option>
                </select>

                <select
                    name="priority"
                    value={filters.priority || ""}
                    onChange={handleChange}
                    style={inputBase}
                    {...focusHandlers}
                >
                    <option value="">
                        All Priorities
                    </option>
                    <option value="Low">
                        Low
                    </option>
                    <option value="Normal">
                        Normal
                    </option>
                    <option value="High">
                        High
                    </option>
                    <option value="Urgent">
                        Urgent
                    </option>
                </select>

                <select
                    name="status"
                    value={filters.status || ""}
                    onChange={handleChange}
                    style={inputBase}
                    {...focusHandlers}
                >
                    <option value="">
                        All Status
                    </option>
                    <option value="Unread">
                        Unread
                    </option>
                    <option value="Read">
                        Read
                    </option>
                </select>

                <input
                    type="date"
                    name="date"
                    value={filters.date || ""}
                    onChange={handleChange}
                    style={inputBase}
                    {...focusHandlers}
                />
            </div>

            <div style={actions}>
                <button
                    onClick={handleExportPDF}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                    style={btnBlue}
                >
                    <HiOutlineArrowDownTray />
                    PDF
                </button>

                <button
                    onClick={handleExportExcel}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#16a34a"; }}
                    style={btnGreen}
                >
                    <HiOutlineArrowDownTray />
                    Excel
                </button>

                <button
                    onClick={handlePrint}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#111827"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1f2937"; }}
                    style={btnGray}
                >
                    <HiOutlinePrinter />
                    Print
                </button>
            </div>
        </div>
    );
}