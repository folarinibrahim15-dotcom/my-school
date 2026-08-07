import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

import {
    useDeleteNotificationMutation,
} from "../../../../../redux/api/notificationApi";

export default function DeleteNotificationModal({
    isOpen,
    onClose,
    notification,
}) {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const handleDelete = async () => {
        if (!notification) return;
        try {
            await deleteNotification(notification._id).unwrap();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    const overlay = {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
        boxSizing: "border-box"
    };

    const modal = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15)", // shadow-xl premium
        width: "100%",
        maxWidth: "448px", // max-w-md
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const content = {
        padding: "2rem", // p-8
        textAlign: "center"
    };

    const iconWrapper = {
        color: "#dc2626", // text-red-500
        marginBottom: "1rem", // mb-4
        display: "flex",
        justifyContent: "center"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const subtitle = {
        color: "#64748b", // text-gray-500
        marginTop: "0.75rem", // mt-3
        fontSize: "0.95rem",
        lineHeight: 1.6
    };

    const itemTitle = {
        fontWeight: "700",
        marginTop: "1rem", // mt-4
        color: "#0f172a",
        fontSize: "1rem",
        wordBreak: "break-word"
    };

    const actions = {
        display: "flex",
        justifyContent: "center",
        gap: "1rem", // gap-4
        marginTop: "2rem", // mt-8
        flexWrap: "wrap"
    };

    const btnCancel = {
        padding: "0.625rem 1.5rem", // px-6 py-2
        borderRadius: "0.75rem", // rounded-lg
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease"
    };

    const btnDanger = {
        padding: "0.625rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        backgroundColor: "#dc2626", // bg-red-600
        color: "#ffffff",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(220, 38, 38, 0.25)"
    };

    const btnDisabled = {
        ...btnDanger,
        opacity: 0.6,
        cursor: "not-allowed"
    };

    return (
        <div style={overlay}>
            <div style={modal}>
                <div style={content}>
                    <div style={iconWrapper}>
                        <HiOutlineExclamationTriangle size={70} />
                    </div>

                    <h2 style={title}>
                        Delete Notification?
                    </h2>

                    <p style={subtitle}>
                        This action cannot be undone.
                    </p>

                    <p style={itemTitle}>
                        {notification?.title}
                    </p>

                    <div style={actions}>
                        <button
                            onClick={onClose}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                            style={btnCancel}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#b91c1c"; }}
                            onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#dc2626"; }}
                            style={isLoading? btnDisabled : btnDanger}
                        >
                            {isLoading? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}