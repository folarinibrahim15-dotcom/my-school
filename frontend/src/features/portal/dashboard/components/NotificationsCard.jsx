import React from "react";
import {
    HiOutlineBell,
    HiOutlineBellAlert,
    HiOutlineUserPlus,
    HiOutlineBanknotes,
    HiOutlineAcademicCap,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
} from "../../../../redux/api/notificationApi";

export default function NotificationsCard() {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError, // <-- FIXED: was missing
        error,
    } = useGetNotificationsQuery(
        {
            page: 1,
            limit: 5,
        },
        {
            pollingInterval: 30000,
            refetchOnFocus: true,
            refetchOnReconnect: true,
            refetchOnMountOrArgChange: true,
        }
    );

    const {
        data: unreadData,
    } = useGetUnreadNotificationCountQuery();

    const notifications = data?.notifications || [];
    const unreadCount = unreadData?.count ?? 0;

    const getIcon = (type) => {
        switch (type?.toUpperCase()) {
            case "ADMISSION":
                return HiOutlineUserPlus;
            case "FINANCE":
                return HiOutlineBanknotes;
            case "ACADEMIC":
                return HiOutlineAcademicCap;
            default:
                return HiOutlineBellAlert;
        }
    };

    const getIconColors = (type) => {
        switch (type?.toUpperCase()) {
            case "ADMISSION":
                return { bg: '#dbeafe', color: '#2563eb' };
            case "FINANCE":
                return { bg: '#dcfce7', color: '#16a34a' };
            case "ACADEMIC":
                return { bg: '#fef9c3', color: '#a16207' };
            default:
                return { bg: '#f3e8ff', color: '#7c3aed' };
        }
    };

    if (isLoading) {
        return (
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                    padding: '1.5rem',
                    margin: '1.5rem',
                    border: '1px solid #f1f5f9',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <div
                    style={{
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <div style={{ height: '1.5rem', width: '10rem', backgroundColor: '#e2e8f0', borderRadius: '0.5rem' }}></div>
                    <div style={{ height: '4rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}></div>
                    <div style={{ height: '4rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}></div>
                    <div style={{ height: '4rem', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                    padding: '1.5rem',
                    margin: '1.5rem',
                    border: '1px solid #fee2e2',
                    textAlign: 'center',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <HiOutlineBellAlert
                    size={40}
                    style={{ margin: '0 auto 0.75rem auto', color: '#ef4444' }}
                />
                <h3
                    style={{
                        fontWeight: '600',
                        color: '#dc2626',
                        fontSize: '1.125rem',
                        margin: '0',
                        lineHeight: '1.6'
                    }}
                >
                    Failed to load notifications
                </h3>
                <p
                    style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        margin: '0.5rem 0 0 0',
                        lineHeight: '1.6'
                    }}
                >
                    Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                padding: '1.5rem',
                margin: '1.5rem',
                border: '1px solid #f1f5f9',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                        <HiOutlineBell size={26} style={{ color: '#334155' }} />
                        {unreadCount > 0 && (
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-0.5rem',
                                    right: '-0.5rem',
                                    minWidth: '1.25rem',
                                    height: '1.25rem',
                                    padding: '0 0.25rem',
                                    borderRadius: '9999px',
                                    backgroundColor: '#dc2626',
                                    color: '#ffffff',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)'
                                }}
                            >
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </div>
                    <div>
                        <h2
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: '#0f172a',
                                margin: '0',
                                lineHeight: '1.6'
                            }}
                        >
                            Notifications
                        </h2>
                        <p
                            style={{
                                fontSize: '0.875rem',
                                color: '#64748b',
                                margin: '0.25rem 0 0 0',
                                lineHeight: '1.6'
                            }}
                        >
                            Latest system updates
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/portal/notifications")}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.textDecoration = 'none'; }}
                    style={{
                        color: '#2563eb',
                        fontWeight: '600',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s ease',
                        fontSize: '0.95rem'
                    }}
                >
                    View All
                </button>
            </div>

            {/* Notification List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                        <HiOutlineBell size={48} style={{ margin: '0 auto', color: '#cbd5e1' }} />
                        <p
                            style={{
                                marginTop: '1rem',
                                color: '#64748b',
                                fontSize: '0.95rem',
                                lineHeight: '1.6'
                            }}
                        >
                            No notifications available.
                        </p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const Icon = getIcon(notification.type);
                        const colors = getIconColors(notification.type);
                        return (
                            <div
                                key={notification._id}
                                onClick={() => !notification.isRead && navigate(`/portal/notifications/${notification._id}`)}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start',
                                    borderBottom: '1px solid #f1f5f9',
                                    paddingBottom: '1rem',
                                    cursor: !notification.isRead ? 'pointer' : 'default',
                                    opacity: notification.isRead ? 0.7 : 1,
                                    transition: 'opacity 0.2s ease'
                                }}
                            >
                                <div
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        borderRadius: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.bg,
                                        color: colors.color,
                                        flexShrink: 0
                                    }}
                                >
                                    <Icon size={22} />
                                </div>

                                <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <h4
                                            style={{
                                                fontWeight: '600',
                                                color: '#1e293b',
                                                fontSize: '1rem',
                                                margin: '0',
                                                lineHeight: '1.6'
                                            }}
                                        >
                                            {notification.title || "Untitled"}
                                        </h4>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                backgroundColor: notification.isRead ? "#dcfce7" : "#ffedd5",
                                                color: notification.isRead ? "#15803d" : "#c2410c",
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {notification.isRead ? "Read" : "Unread"}
                                        </span>
                                    </div>

                                    <p
                                        style={{
                                            fontSize: '0.875rem',
                                            color: '#64748b',
                                            marginTop: '0.5rem',
                                            lineHeight: '1.6',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {notification.message}
                                    </p>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '0.75rem',
                                            flexWrap: 'wrap',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '500' }}>
                                            {notification.type || "General"}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "--"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}