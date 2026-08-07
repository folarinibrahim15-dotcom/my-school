import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    HiOutlineArrowLeft,
    HiOutlinePrinter,
    HiOutlineArrowDownTray,
    HiOutlineBell,
    HiOutlineUser,
    HiOutlineCalendarDays,
    HiOutlineTag,
} from "react-icons/hi2";

import {
   useGetNotificationQuery,
} from "../../../../../redux/api/notificationApi";

import {
    exportToPDF,
    printReport,
} from "../../../../../utils/reportExport";

export default function NotificationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetNotificationQuery(id);

    if (isLoading) {
        return (
            <div style={{
                padding: "2.5rem", // p-10
                fontSize: "1rem",
                color: "#334155",
                fontFamily: "system-ui, -apple-system, sans-serif"
            }}>
                Loading notification...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: "2.5rem",
                color: "#dc2626", // text-red-600
                fontSize: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif"
            }}>
                Failed to load notification.
            </div>
        );
    }

    const notification = data?.notification;
    if (!notification) {
        return (
            <div style={{
                padding: "2.5rem",
                textAlign: "center",
                fontSize: "1rem",
                color: "#64748b",
                fontFamily: "system-ui, -apple-system, sans-serif"
            }}>
                Notification not found.
            </div>
        );
    }

    const handlePrint = () => {
        printReport();
    };

    const handleExport = () => {
        exportToPDF(
            "Notification",
            ["Field", "Value"],
            [
                ["Title", notification.title],
                ["Recipient", notification.recipient],
                ["Type", notification.type],
                ["Priority", notification.priority],
                ["Status", notification.isRead ? "Read" : "Unread"],
                ["Created", new Date(notification.createdAt).toLocaleString()],
                ["Message", notification.message],
            ]
        );
    };

    const pageWrapper = {
        padding: "clamp(16px, 4vw, 32px)", // generous spacing all sides
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem", // space-y-6
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        lineHeight: 1.6,
        boxSizing: "border-box",
        width: "100%"
    };

    const headerContainer = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // responsive wrap
        gap: "1rem"
    };

    const headerLeft = {
        display: "flex",
        alignItems: "center",
        gap: "1rem" // gap-4
    };

    const backButton = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-lg
        padding: "0.5rem", // p-2
        backgroundColor: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease"
    };

    const titleH1 = {
        fontSize: "clamp(1.5rem, 4vw, 1.875rem)", // text-3xl responsive
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const subtitleP = {
        color: "#64748b", // text-gray-500
        fontSize: "0.875rem",
        margin: "0.25rem 0 0 0"
    };

    const actionButtons = {
        display: "flex",
        gap: "0.75rem", // gap-3
        flexWrap: "wrap"
    };

    const btnPrimary = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        backgroundColor: "#1d4ed8", // bg-blue-600 premium
        color: "#ffffff",
        padding: "0.625rem 1rem", // px-4 py-2
        borderRadius: "0.75rem", // rounded-lg
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
        fontSize: "0.9rem",
        transition: "all 0.2s ease"
    };

    const btnSuccess = {
       ...btnPrimary,
        backgroundColor: "#16a34a", // bg-green-600
        boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)"
    };

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow premium
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 5vw, 2rem)", // p-8 responsive
        width: "100%",
        boxSizing: "border-box"
    };

    const cardHeader = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem", // gap-3
        marginBottom: "2rem" // mb-8
    };

    const cardTitle = {
        fontSize: "clamp(1.25rem, 3vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const grid2Col = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // responsive 1 to 2 cols
        gap: "2rem" // gap-8
    };

    const fieldLabel = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // gap-2
        marginBottom: "1.5rem", // mb-6
        fontWeight: "600",
        color: "#334155"
    };

    const fieldValue = {
        color: "#0f172a",
        fontSize: "0.95rem",
        wordBreak: "break-word"
    };

    const divider = {
        margin: "2rem 0", // my-8
        border: "none",
        borderTop: "1px solid #e5e7eb"
    };

    const sectionTitle = {
        fontWeight: "700",
        fontSize: "1.25rem", // text-xl
        marginBottom: "1rem", // mb-4
        color: "#0f172a"
    };

    const messageText = {
        lineHeight: 1.8, // leading-8
        color: "#334155", // text-gray-700
        whiteSpace: "pre-wrap",
        fontSize: "0.95rem"
    };

    return (
        <div style={pageWrapper}>
            {/* Header */}
            <div style={headerContainer}>
                <div style={headerLeft}>
                    <button
                        onClick={() => navigate("/portal/notifications")}
                        style={backButton}
                    >
                        <HiOutlineArrowLeft size={22} />
                    </button>
                    <div>
                        <h1 style={titleH1}>
                            Notification Details
                        </h1>
                        <p style={subtitleP}>
                            {notification._id}
                        </p>
                    </div>
                </div>
                <div style={actionButtons}>
                    <button
                        onClick={handlePrint}
                        style={btnPrimary}
                    >
                        <HiOutlinePrinter />
                        Print
                    </button>
                    <button
                        onClick={handleExport}
                        style={btnSuccess}
                    >
                        <HiOutlineArrowDownTray />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Information Card */}
            <div style={card}>
                <div style={cardHeader}>
                    <HiOutlineBell
                        style={{ color: "#1d4ed8" }}
                        size={32}
                    />
                    <h2 style={cardTitle}>
                        {notification.title}
                    </h2>
                </div>

                <div style={grid2Col}>
                    <div>
                        <div style={fieldLabel}>
                            <HiOutlineUser />
                            <span>Recipient</span>
                        </div>
                        <p style={fieldValue}>
                            {notification.recipient}
                        </p>
                    </div>
                    <div>
                        <div style={fieldLabel}>
                            <HiOutlineTag />
                            <span>Type</span>
                        </div>
                        <p style={fieldValue}>
                            {notification.type}
                        </p>
                    </div>
                    <div>
                        <div style={fieldLabel}>
                            <HiOutlineTag />
                            <span>Priority</span>
                        </div>
                        <p style={fieldValue}>
                            {notification.priority}
                        </p>
                    </div>
                    <div>
                        <div style={fieldLabel}>
                            <HiOutlineCalendarDays />
                            <span>Created</span>
                        </div>
                        <p style={fieldValue}>
                            {new Date(notification.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <hr style={divider} />

                <h3 style={sectionTitle}>
                    Message
                </h3>
                <p style={messageText}>
                    {notification.message}
                </p>
            </div>
        </div>
    );
}