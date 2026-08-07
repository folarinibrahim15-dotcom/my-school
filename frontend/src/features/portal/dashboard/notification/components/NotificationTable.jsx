import React from "react";
import { useNavigate } from "react-router-dom";

import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineCheckCircle,
} from "react-icons/hi2";

import {
    useMarkNotificationAsReadMutation,
    useDeleteNotificationMutation,
} from "../../../../../redux/api/notificationApi";

export default function NotificationTable({
    notifications = [],
    onEdit,
    onDelete,
}) {
    const navigate = useNavigate();
    const [markAsRead] = useMarkNotificationAsReadMutation();
    const [deleteNotification] = useDeleteNotificationMutation();

    const handleRead = async (id) => {
        try {
            await markAsRead(id).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this notification?")) {
            return;
        }
        try {
            await deleteNotification(id).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    const getTypeBadge = (type) => ({
        backgroundColor: "#dbeafe",
        color: "#1d4ed8",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        fontWeight: "500"
    });

    const getPriorityBadge = (priority) => {
        const map = {
            High: { bg: "#fee2e2", color: "#b91c1c" },
            Urgent: { bg: "#dc2626", color: "#ffffff" },
            Normal: { bg: "#fef9c3", color: "#a16207" },
            Low: { bg: "#dcfce7", color: "#15803d" },
        };
        const s = map[priority] || map.Low;
        return {
            backgroundColor: s.bg,
            color: s.color,
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: "500"
        };
    };

    const getStatusBadge = (isRead) => ({
        backgroundColor: isRead? "#dcfce7" : "#ffedd5",
        color: isRead? "#15803d" : "#c2410c",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        fontWeight: "500"
    });

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

    const wrapper = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        padding: "1.5rem",
        borderBottom: "1px solid #e5e7eb"
    };

    const title = {
        fontSize: "clamp(1.125rem, 3vw, 1.25rem)",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0
    };

    const thStyle = {
        padding: "1rem",
        textAlign: "left",
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#334155",
        backgroundColor: "#f8fafc"
    };

    const tdStyle = {
        padding: "1rem",
        fontSize: "0.95rem",
        color: "#0f172a",
        borderTop: "1px solid #f1f5f9"
    };

    const emptyState = {
        textAlign: "center",
        padding: "4rem 1rem",
        color: "#64748b"
    };

    return (
        <div style={wrapper}>
            <div style={header}>
                <h2 style={title}>Notifications</h2>
            </div>

            {/* DESKTOP TABLE */}
            <div className="desktop-table" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Recipient</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Priority</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Date</th>
                            <th style={{...thStyle, textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length === 0? (
                            <tr>
                                <td colSpan="7" style={emptyState}>
                                    No notifications found.
                                </td>
                            </tr>
                        ) : (
                            notifications.map((notification) => (
                                <tr
                                    key={notification._id}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                                >
                                    <td style={{...tdStyle, fontWeight: "600"}}>{notification.title}</td>
                                    <td style={tdStyle}>{notification.recipient || "All Users"}</td>
                                    <td style={tdStyle}><span style={getTypeBadge(notification.type)}>{notification.type}</span></td>
                                    <td style={tdStyle}><span style={getPriorityBadge(notification.priority)}>{notification.priority}</span></td>
                                    <td style={tdStyle}><span style={getStatusBadge(notification.isRead)}>{notification.isRead? "Read" : "Unread"}</span></td>
                                    <td style={tdStyle}>{new Date(notification.createdAt).toLocaleDateString()}</td>
                                    <td style={{...tdStyle, textAlign: "center"}}>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                                            <button
                                                onClick={() => navigate(`/portal/notifications/${notification._id}`)}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eff6ff"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                style={actionButton("#2563eb")}
                                                title="View"
                                            >
                                                <HiOutlineEye size={20} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(notification)}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                style={actionButton("#16a34a")}
                                                title="Edit"
                                            >
                                                <HiOutlinePencilSquare size={20} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(notification)}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                style={actionButton("#dc2626")}
                                                title="Delete"
                                            >
                                                <HiOutlineTrash size={20} />
                                            </button>
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => handleRead(notification._id)}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#faf5ff"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                    style={actionButton("#9333ea")}
                                                    title="Mark as Read"
                                                >
                                                    <HiOutlineCheckCircle size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile-cards" style={{ display: "none", padding: "1rem", flexDirection: "column", gap: "1rem" }}>
                {notifications.length === 0? (
                    <div style={emptyState}>No notifications found.</div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
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
                                        {notification.title}
                                    </p>
                                    <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
                                        {notification.recipient || "All Users"}
                                    </p>
                                </div>
                                <span style={getStatusBadge(notification.isRead)}>
                                    {notification.isRead? "Read" : "Unread"}
                                </span>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                                <div>
                                    <p style={{ color: "#64748b", margin: 0 }}>Type</p>
                                    <p style={{ margin: "0.25rem 0 0 0" }}><span style={getTypeBadge(notification.type)}>{notification.type}</span></p>
                                </div>
                                <div>
                                    <p style={{ color: "#64748b", margin: 0 }}>Priority</p>
                                    <p style={{ margin: "0.25rem 0 0 0" }}><span style={getPriorityBadge(notification.priority)}>{notification.priority}</span></p>
                                </div>
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <p style={{ color: "#64748b", margin: 0 }}>Date</p>
                                    <p style={{ fontWeight: "600", margin: "0.25rem 0 0 0", color: "#0f172a" }}>
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", flexWrap: "wrap" }}>
                                <button
                                    onClick={() => navigate(`/portal/notifications/${notification._id}`)}
                                    style={{...actionButton("#2563eb"), flex: 1, border: "1px solid #bfdbfe", backgroundColor: "#eff6ff"}}
                                >
                                    <HiOutlineEye size={18} /> View
                                </button>
                                <button
                                    onClick={() => onEdit(notification)}
                                    style={{...actionButton("#16a34a"), flex: 1, border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4"}}
                                >
                                    <HiOutlinePencilSquare size={18} /> Edit
                                </button>
                                <button
                                    onClick={() => onDelete(notification)}
                                    style={{...actionButton("#dc2626"), flex: 1, border: "1px solid #fecaca", backgroundColor: "#fef2f2"}}
                                >
                                    <HiOutlineTrash size={18} /> Delete
                                </button>
                                {!notification.isRead && (
                                    <button
                                        onClick={() => handleRead(notification._id)}
                                        style={{...actionButton("#9333ea"), flex: 1, border: "1px solid #e9d5ff", backgroundColor: "#faf5ff"}}
                                    >
                                        <HiOutlineCheckCircle size={18} /> Read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
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