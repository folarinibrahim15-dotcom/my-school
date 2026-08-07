import React from "react";

import {
    HiOutlineBell,
    HiOutlineBellAlert,
    HiOutlineCheckCircle,
    HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function NotificationStatistics({
    notifications = []
}) {
    const totalNotifications = notifications.length;

    const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const readNotifications = notifications.filter(
        (notification) => notification.isRead
    ).length;

    const today = new Date().toDateString();

    const todayNotifications = notifications.filter((notification) => {
        const createdDate = new Date(
            notification.createdAt
        ).toDateString();
        return createdDate === today;
    }).length;

    const cards = [
        {
            title: "Total Notifications",
            value: totalNotifications,
            bg: "#1d4ed8", // blue-600
            icon: <HiOutlineBell size={28} />
        },
        {
            title: "Unread",
            value: unreadNotifications,
            bg: "#dc2626", // red-600
            icon: <HiOutlineBellAlert size={28} />
        },
        {
            title: "Read",
            value: readNotifications,
            bg: "#16a34a", // green-600
            icon: <HiOutlineCheckCircle size={28} />
        },
        {
            title: "Today",
            value: todayNotifications,
            bg: "#eab308", // yellow-500
            icon: <HiOutlineCalendarDays size={28} />
        }
    ];

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", // 1 col mobile, 2 col md, 4 col xl
        gap: "1.5rem", // gap-6
        width: "100%",
        boxSizing: "border-box"
    };

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // soft premium shadow
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 1.5rem)", // p-6 responsive
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.2s ease",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const textWrapper = {
        display: "flex",
        flexDirection: "column"
    };

    const label = {
        color: "#64748b", // text-gray-500
        fontSize: "0.95rem",
        margin: 0,
        lineHeight: 1.6
    };

    const value = {
        fontSize: "clamp(1.75rem, 5vw, 1.875rem)", // text-3xl responsive
        fontWeight: "700",
        color: "#0f172a",
        marginTop: "0.5rem", // mt-2
        margin: "0.5rem 0 0 0",
        lineHeight: 1.2
    };

    const iconBox = (bg) => ({
        backgroundColor: bg,
        color: "#ffffff",
        padding: "1rem", // p-4
        borderRadius: "1rem", // rounded-xl
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
    });

    return (
        <div style={grid}>
            {cards.map((card) => (
                <div
                    key={card.title}
                    onMouseEnter={(e) => { 
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.1)";
                    }}
                    onMouseLeave={(e) => { 
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.06)";
                    }}
                    style={cardStyle}
                >
                    <div style={textWrapper}>
                        <p style={label}>
                            {card.title}
                        </p>
                        <h2 style={value}>
                            {card.value}
                        </h2>
                    </div>
                    <div style={iconBox(card.bg)}>
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}