import React from "react";
import { useNavigate } from "react-router-dom";
import {
    HiOutlineUserPlus,
    HiOutlineBanknotes,
    HiOutlineAcademicCap,
    HiOutlineClipboardDocumentList,
    HiOutlineUserCircle,
} from "react-icons/hi2";

import { useGetActivityTimelineQuery } from "../../../../redux/api/activityApi";

export default function ActivityTimeline() {

    const navigate = useNavigate();

    const {

        data,

        isLoading,

        isError,

    } = useGetActivityTimelineQuery();

    const activities = data?.activities || [];

    const getIcon = (type) => {

        switch (type) {

            case "Admission":
                return HiOutlineUserPlus;

            case "Finance":
                return HiOutlineBanknotes;

            case "Teacher":
                return HiOutlineAcademicCap;

            case "Result":
                return HiOutlineClipboardDocumentList;

            case "Login":
                return HiOutlineUserCircle;

            default:
                return HiOutlineUserCircle;

        }

    };

    const getColor = (type) => {

        switch (type) {

            case "Admission":
                return "bg-blue-100 text-blue-700";

            case "Finance":
                return "bg-green-100 text-green-700";

            case "Teacher":
                return "bg-purple-100 text-purple-700";

            case "Result":
                return "bg-yellow-100 text-yellow-700";

            case "Login":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    const formatTime = (date) => {

        if (!date) return "";

        const now = new Date();

        const created = new Date(date);

        const seconds = Math.floor((now - created) / 1000);

        if (seconds < 60) return "Just now";

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60)
            return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

        const hours = Math.floor(minutes / 60);

        if (hours < 24)
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;

        const days = Math.floor(hours / 24);

        if (days === 1) return "Yesterday";

        if (days < 7)
            return `${days} days ago`;

        return created.toLocaleDateString();

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
            <h2
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    color: '#0f172a',
                    lineHeight: '1.6'
                }}
            >
                Activity Timeline
            </h2>
            <p
                style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    margin: '0'
                }}
            >
                Loading activities...
            </p>
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
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}
        >
            <h2
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    color: '#0f172a',
                    lineHeight: '1.6'
                }}
            >
                Activity Timeline
            </h2>
            <p
                style={{
                    color: '#dc2626',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    margin: '0'
                }}
            >
                Unable to load activities.
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
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
            <h2
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    margin: '0',
                    lineHeight: '1.6'
                }}
            >
                Activity Timeline
            </h2>

            <button
                onClick={() => navigate("/portal/reports")}
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

        {/* Timeline List */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem' // space-y-6
            }}
        >
            {activities.length === 0 ? (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '2.5rem 0',
                        color: '#64748b',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                    }}
                >
                    No recent activities.
                </div>
            ) : (
                activities.map((activity, index) => {
                    const Icon = getIcon(activity.type);
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start'
                            }}
                        >
                            <div
                                style={{
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: getColor(activity.type).includes('blue') ? '#dbeafe' : 
                                                    getColor(activity.type).includes('green') ? '#dcfce7' : 
                                                    getColor(activity.type).includes('orange') ? '#ffedd5' : 
                                                    getColor(activity.type).includes('red') ? '#fee2e2' : '#f1f5f9',
                                    color: getColor(activity.type).includes('blue') ? '#2563eb' : 
                                           getColor(activity.type).includes('green') ? '#16a34a' : 
                                           getColor(activity.type).includes('orange') ? '#ea580c' : 
                                           getColor(activity.type).includes('red') ? '#dc2626' : '#475569',
                                    flexShrink: 0
                                }}
                            >
                                <Icon size={22} />
                            </div>

                            <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                                <h3
                                    style={{
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        fontSize: '1rem',
                                        margin: '0',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {activity.title}
                                </h3>
                                <p
                                    style={{
                                        color: '#64748b',
                                        marginTop: '0.25rem',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {activity.description}
                                </p>
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    {formatTime(activity.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    </div>
);
}