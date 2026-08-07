import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarMenu } from "../../constants/sidebarMenu";
import SidebarItem from "../../layout/SidebarItem";

import { logout } from "../../../../features/auth/authSlice";
import { useLogoutMutation } from "../../../../redux/api/authApi";

import {
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
    HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [logoutUser] = useLogoutMutation();

    /*
    ==========================================================
    Logged-in User
    ==========================================================
    */

    const { user } = useSelector(
        (state) => state.auth
    );

    /*
    ==========================================================
    Current Role
    ==========================================================
    */

    const role = user?.role || "admin";

    /*
    ==========================================================
    User Full Name
    ==========================================================
    */

    const fullName =

        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||

        "Administrator";

    /*
    ==========================================================
    Avatar Initials
    ==========================================================
    */

    const initials =

        `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`

            .toUpperCase() ||

        "A";

    /*
    ==========================================================
    Logout
    ==========================================================
    */

    const handleLogout = async () => {

        try {

            await logoutUser().unwrap();

        } catch (error) {

            console.log("Logout Error:", error);

        } finally {

            dispatch(logout());

            navigate("/portal/login", {
                replace: true,
            });

        }

    };

    return (

       <aside
            style={{
                height: '100vh',
                backgroundColor: '#020617',
                color: '#ffffff',
                transition: 'all 300ms ease',
                display: 'flex',
                flexDirection: 'column',
                width: collapsed ? '6rem' : '18rem',
                flexShrink: 0,
                overflow: 'hidden'
            }}
        >
            {/* =======================================================
                    Header
            ======================================================= */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    borderBottom: '1px solid #1e293b'
                }}
            >
                {!collapsed && (
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            margin: '0',
                            lineHeight: '1.4'
                        }}>
                            Sound Peace
                        </h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#94a3b8',
                            margin: '0.25rem 0 0 0',
                            lineHeight: '1.6'
                        }}>
                            ERP Portal
                        </p>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#facc15'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                    style={{
                        color: '#ffffff',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {collapsed ? (
                        <HiChevronDoubleRight size={22} />
                    ) : (
                        <HiChevronDoubleLeft size={22} />
                    )}
                </button>
            </div>

            {/* =======================================================
                    Navigation
            ======================================================= */}
            <nav
                style={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    padding: '1.25rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}
            >
                {sidebarMenu.map((section) => {
                    const visibleItems = section.items.filter((item) => item.roles.includes(role));
                    if (visibleItems.length === 0) return null;
                    return (
                        <div key={section.section}>
                            {!collapsed && (
                                <h4
                                    style={{
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        color: '#64748b',
                                        margin: '0 0 0.75rem 0',
                                        padding: '0 0.5rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {section.section}
                                </h4>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {visibleItems.map((item) => (
                                    <SidebarItem
                                        key={item.path}
                                        icon={item.icon}
                                        title={item.title}
                                        path={item.path}
                                        collapsed={collapsed}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* =======================================================
                    Footer / User Profile
            ======================================================= */}
            <div
                style={{
                    borderTop: '1px solid #1e293b',
                    padding: '1.25rem',
                    backgroundColor: '#020617'
                }}
            >
                {!collapsed ? (
                    <>
                        {/* User Profile */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {/* Avatar */}
                            <div
                                style={{
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '50%',
                                    backgroundColor: '#facc15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#0f172a',
                                    fontWeight: '700',
                                    fontSize: '1.125rem',
                                    textTransform: 'uppercase',
                                    flexShrink: 0
                                }}
                            >
                                {initials}
                            </div>
                            {/* User Details */}
                            <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                                <h3 style={{
                                    fontWeight: '600',
                                    margin: '0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1rem'
                                }}>
                                    {fullName}
                                </h3>
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#94a3b8',
                                    margin: '0.25rem 0 0 0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {user?.email || "No Email"}
                                </p>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        marginTop: '0.5rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                        color: '#93c5fd',
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    {user?.role || "Admin"}
                                </span>
                            </div>
                        </div>
                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                            style={{
                                marginTop: '1.25rem',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                borderRadius: '12px',
                                backgroundColor: '#dc2626',
                                color: '#ffffff',
                                transition: 'all 0.2s ease',
                                padding: '0.75rem',
                                fontWeight: '500',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 4px 10px rgba(220, 38, 38, 0.25)'
                            }}
                        >
                            <HiOutlineArrowLeftOnRectangle size={20} />
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#f87171';
                            e.currentTarget.style.backgroundColor = '#0f172a';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#ef4444';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            color: '#ef4444',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <HiOutlineArrowLeftOnRectangle size={24} />
                    </button>
                )}
            </div>
        </aside>

    );

}