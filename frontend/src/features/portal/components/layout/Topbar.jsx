import React, {
    useState,
    useEffect, // FIXED
    useMemo,
} from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../features/auth/authSlice";
import { useLogoutMutation } from "../../../../redux/api/authApi";
import {
    HiBars3,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
    HiChevronDown,
} from "react-icons/hi2";

export default function Topbar({ onOpenSidebar }) {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApi] = useLogoutMutation();

    const { user } = useSelector((state) => state.auth);

    const fullName = useMemo(() => {
        if (!user) return "Guest";
        return [user.firstName, user.lastName].filter(Boolean).join(" ");
    }, [user]);

    const initials = useMemo(() => {
        if (!user) return "G";
        const first = user.firstName?.charAt(0) || "";
        const last = user.lastName?.charAt(0) || "";
        return `${first}${last}`.toUpperCase();
    }, [user]);

    const role = useMemo(() => {
        if (!user?.role) return "User";
        return user.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }, [user]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    }, []);

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
        } catch (err) {
            console.log(err);
        }
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/portal/login", { replace: true });
    };

    return (
<header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 30,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: '0.75rem 0'
            }}
        >
            <div
                style={{
                    height: 'auto',
                    minHeight: '5rem',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '1rem' : '0',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                }}
            >
                {/* LEFT */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: isMobile ? '100%' : 'auto' }}>
                    <button
                        onClick={onOpenSidebar}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                        style={{
                            color: '#334155',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.25rem'
                        }}
                    >
                        <HiBars3 size={28} />
                    </button>
                    <div>
                        <h2
                            style={{
                                fontSize: isMobile ? '1.25rem' : '1.5rem',
                                fontWeight: '700',
                                color: '#1e293b',
                                margin: '0',
                                lineHeight: '1.4'
                            }}
                        >
                            {greeting},{" "}
                            <span style={{ color: '#1d4ed8' }}>
                                {user?.firstName || "Guest"}
                            </span>
                            👋
                        </h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            margin: '0.25rem 0 0 0',
                            lineHeight: '1.6'
                        }}>
                            Welcome to Sound Peace ERP
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: isMobile ? 'stretch' : 'center', 
                    gap: '1rem', 
                    position: 'relative',
                    width: isMobile ? '100%' : 'auto',
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    
                    {/* DESKTOP SEARCH */}
                    {!isMobile && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '12px',
                                padding: '0.5rem 1rem',
                                width: '20rem',
                                maxWidth: '100%'
                            }}
                        >
                            <HiOutlineMagnifyingGlass style={{ color: '#6b7280', flexShrink: 0 }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    backgroundColor: 'transparent',
                                    outline: 'none',
                                    marginLeft: '0.75rem',
                                    width: '100%',
                                    border: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    )}

                    {/* ACTIONS ROW */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                        
                        {/* MOBILE SEARCH ICON */}
                        {isMobile && (
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    backgroundColor: showMobileSearch ? '#dbeafe' : '#f1f5f9',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <HiOutlineMagnifyingGlass size={22} color={showMobileSearch ? '#1d4ed8' : '#334155'} />
                            </button>
                        )}

                        {/* NOTIFICATION */}
                        <button
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            style={{
                                position: 'relative',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                backgroundColor: '#f1f5f9',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <HiOutlineBell size={22} color="#334155" />
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    width: '0.625rem',
                                    height: '0.625rem',
                                    borderRadius: '50%',
                                    backgroundColor: '#ef4444'
                                }}
                            />
                        </button>

                        {/* USER PROFILE */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                borderRadius: '12px',
                                padding: '0.5rem',
                                transition: 'background-color 0.2s ease',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                flex: isMobile ? 1 : '0 0 auto'
                            }}
                        >
                            <div
                                style={{
                                    width: isMobile ? '2.5rem' : '3rem',
                                    height: isMobile ? '2.5rem' : '3rem',
                                    borderRadius: '50%',
                                    backgroundColor: '#1d4ed8',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    fontSize: isMobile ? '1rem' : '1.125rem',
                                    flexShrink: 0
                                }}
                            >
                                {initials}
                            </div>
                            {!isMobile && (
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ fontWeight: '600', margin: '0', fontSize: '0.95rem', color: '#1e293b' }}>
                                        {fullName}
                                    </h4>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0' }}>
                                        {user?.email}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: '#1d4ed8', margin: '0' }}>
                                        {role}
                                    </p>
                                </div>
                            )}
                            <HiChevronDown
                                style={{
                                    transition: 'transform 300ms ease',
                                    transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    color: '#64748b'
                                }}
                            />
                        </button>
                    </div>

                    {/* MOBILE SEARCH BAR - DROPDOWN */}
                    {isMobile && showMobileSearch && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '12px',
                                padding: '0.75rem 1rem',
                                animation: 'slideDown 0.2s ease',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                            }}
                        >
                            <HiOutlineMagnifyingGlass style={{ color: '#6b7280', flexShrink: 0 }} />
                            <input
                                type="text"
                                placeholder="Search students, teachers..."
                                autoFocus
                                style={{
                                    backgroundColor: 'transparent',
                                    outline: 'none',
                                    marginLeft: '0.75rem',
                                    width: '100%',
                                    border: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    {/* USER DROPDOWN - same as before */}
                    {menuOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: isMobile ? '100%' : '5rem',
                                right: isMobile ? '0' : '1.5rem',
                                left: isMobile ? '0' : 'auto',
                                width: isMobile ? '100%' : '18rem',
                                marginTop: isMobile ? '0.5rem' : '0',
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                zIndex: 50
                            }}
                        >
                            {/* ... keep your existing dropdown code here ... */}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}