import React, { useState } from "react";
import {
    HiOutlineXMark,
} from "react-icons/hi2";

import {
    useAddNotificationMutation,
} from "../../../../../redux/api/notificationApi";

export default function AddNotificationModal({
    isOpen,
    onClose,
}) {
    const [createNotification, { isLoading }] = useAddNotificationMutation();

    const [formData, setFormData] = useState({
        title: "",
        message: "",
        recipient: "",
        sender: "",
        type: "SYSTEM",
        priority: "MEDIUM"
    });

    const handleChange = (e) => {
        setFormData({
           ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: formData.title.trim(),
                message: formData.message.trim(),
                recipient: formData.recipient,
                type: formData.type.toUpperCase(),
                priority: formData.priority.toUpperCase(),
            };
            const response = await createNotification(payload).unwrap();
            console.log("Notification Created:", response);
            alert(response.message || "Notification created successfully!");
            setFormData({
                title: "",
                message: "",
                recipient: "",
                type: "SYSTEM",
                priority: "MEDIUM",
            });
            onClose();
        } catch (err) {
            console.error("Notification Error:", err);
            alert(
                err?.data?.errors?.join("\n") ||
                err?.data?.message ||
                "Failed to create notification."
            );
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
        maxWidth: "672px", // max-w-2xl
        maxHeight: "90vh",
        overflowY: "auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem", // p-6
        borderBottom: "1px solid #e5e7eb"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const closeBtn = {
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: "0.5rem",
        borderRadius: "0.75rem",
        color: "#64748b",
        transition: "all 0.2s ease"
    };

    const form = {
        padding: "1.5rem", // p-6
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem" // space-y-5
    };

    const inputBase = {
        width: "100%",
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-lg
        padding: "0.875rem 1rem", // p-3
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
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

    const grid3 = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // 1 col mobile, 3 col md+
        gap: "1rem" // gap-4
    };

    const actions = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.75rem", // gap-3
        paddingTop: "1rem", // pt-4
        flexWrap: "wrap"
    };

    const btnCancel = {
        padding: "0.625rem 1.25rem", // px-5 py-2
        borderRadius: "0.75rem", // rounded-lg
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease"
    };

    const btnPrimary = {
        padding: "0.625rem 1.25rem",
        borderRadius: "0.75rem",
        border: "none",
        backgroundColor: "#1d4ed8", // bg-blue-600
        color: "#ffffff",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
    };

    const btnDisabled = {
       ...btnPrimary,
        opacity: 0.6,
        cursor: "not-allowed"
    };

    return (
        <div style={overlay}>
            <div style={modal}>
                {/* Header */}
                <div style={header}>
                    <h2 style={title}>
                        Create Notification
                    </h2>
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        style={closeBtn}
                    >
                        <HiOutlineXMark size={26} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={form}>
                    <input
                        type="text"
                        name="recipient"
                        placeholder="Recipient User ID"
                        value={formData.recipient}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                        required
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Notification Title"
                        value={formData.title}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Notification Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        style={{...inputBase, resize: "vertical"}}
                        {...focusHandlers}
                        required
                    />

                    <div style={grid3}>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option value="SYSTEM">SYSTEM</option>
                            <option value="ACADEMIC">ACADEMIC</option>
                            <option value="FINANCE">FINANCE</option>
                            <option value="EVENT">EVENT</option>
                            <option value="MESSAGE">MESSAGE</option>
                            <option value="SECURITY">SECURITY</option>
                        </select>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="URGENT">URGENT</option>
                        </select>
                    </div>

                    <div style={actions}>
                        <button
                            type="button"
                            onClick={onClose}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                            style={btnCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1e40af"; }}
                            onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                            style={isLoading? btnDisabled : btnPrimary}
                        >
                            {isLoading? "Creating..." : "Create Notification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}