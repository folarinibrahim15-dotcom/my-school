import React from "react";
import { useSelector } from "react-redux";
import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineUser,
} from "react-icons/hi2";

export default function AdminProfileCard() {

    const { user } = useSelector((state) => state.auth);

    const fullName =
        user
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "Administrator";

    const initials =
        `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`.toUpperCase();

    const avatar = user?.avatar
        ? user.avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              fullName
          )}&background=2563eb&color=ffffff&size=256`;

        return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem', // rounded-2xl
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)', // shadow-sm
                border: '1px solid #e2e8f0', // border border-slate-200
                padding: '1.5rem', // p-6
                margin: '1.5rem', // space so it doesn't touch screen edges
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}
        >
            {/* Profile Header */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <img
                    src={avatar}
                    alt={fullName}
                    style={{
                        width: '6rem', // w-24
                        height: '6rem', // h-24
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid #dbeafe' // border-4 border-blue-100
                    }}
                />

                <h2
                    style={{
                        marginTop: '1.25rem', // mt-5
                        fontSize: '1.5rem', // text-2xl
                        fontWeight: '700',
                        color: '#1e293b', // text-slate-800
                        textAlign: 'center',
                        lineHeight: '1.6',
                        margin: '1.25rem 0 0 0'
                    }}
                >
                    {fullName}
                </h2>

                <p
                    style={{
                        marginTop: '0.25rem', // mt-1
                        color: '#2563eb', // text-blue-600
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        margin: '0.25rem 0 0 0'
                    }}
                >
                    {user?.role || "Administrator"}
                </p>
            </div>

            {/* Info List */}
            <div
                style={{
                    marginTop: '2rem', // mt-8
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem' // space-y-5
                }}
            >
                {/* Email */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem' // gap-3
                    }}
                >
                    <div
                        style={{
                            width: '2.5rem', // w-10
                            height: '2.5rem', // h-10
                            borderRadius: '0.5rem', // rounded-lg
                            backgroundColor: '#dbeafe', // bg-blue-100
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <HiOutlineEnvelope style={{ color: '#1d4ed8', fontSize: '1.25rem' }} size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                fontSize: '0.75rem', // text-xs
                                color: '#64748b', // text-gray-500
                                margin: '0',
                                lineHeight: '1.6'
                            }}
                        >
                            Email
                        </p>
                        <p
                            style={{
                                fontWeight: '500',
                                wordBreak: 'break-all', // break-all
                                color: '#0f172a',
                                margin: '0.125rem 0 0 0',
                                lineHeight: '1.6'
                            }}
                        >
                            {user?.email || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#dcfce7', // bg-green-100
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <HiOutlinePhone style={{ color: '#15803d', fontSize: '1.25rem' }} size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0', lineHeight: '1.6' }}>
                            Phone Number
                        </p>
                        <p style={{ fontWeight: '500', color: '#0f172a', margin: '0.125rem 0 0 0', lineHeight: '1.6' }}>
                            {user?.phoneNumber || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Access Level */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#f3e8ff', // bg-purple-100
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <HiOutlineShieldCheck style={{ color: '#7c3aed', fontSize: '1.25rem' }} size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0', lineHeight: '1.6' }}>
                            Access Level
                        </p>
                        <p style={{ fontWeight: '500', textTransform: 'capitalize', color: '#0f172a', margin: '0.125rem 0 0 0', lineHeight: '1.6' }}>
                            {user?.role || "Administrator"}
                        </p>
                    </div>
                </div>

                {/* User ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#ffedd5', // bg-orange-100
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <HiOutlineUser style={{ color: '#ea580c', fontSize: '1.25rem' }} size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0', lineHeight: '1.6' }}>
                            User ID
                        </p>
                        <p style={{ fontWeight: '500', color: '#0f172a', margin: '0.125rem 0 0 0', lineHeight: '1.6' }}>
                            {user?.id || user?._id || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}