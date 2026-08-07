import React from "react";

import {
    HiOutlineBuildingOffice2,
    HiOutlineAcademicCap,
    HiOutlineUsers,
    HiOutlinePaintBrush,
    HiOutlineBell,
    HiOutlineShieldCheck,
    HiOutlineCircleStack,
    HiOutlineComputerDesktop,
    HiOutlineInformationCircle,
} from "react-icons/hi2";

export default function SettingsSidebar({
    activeTab,
    setActiveTab,
}) {
    const menus = [
        { id: "school", title: "School Profile", icon: <HiOutlineBuildingOffice2 size={20} /> },
        { id: "academic", title: "Academic", icon: <HiOutlineAcademicCap size={20} /> },
        { id: "users", title: "Users", icon: <HiOutlineUsers size={20} /> },
        { id: "appearance", title: "Appearance", icon: <HiOutlinePaintBrush size={20} /> },
        { id: "notifications", title: "Notifications", icon: <HiOutlineBell size={20} /> },
        { id: "security", title: "Security", icon: <HiOutlineShieldCheck size={20} /> },
        { id: "backup", title: "Backup & Restore", icon: <HiOutlineCircleStack size={20} /> },
        { id: "system", title: "System", icon: <HiOutlineComputerDesktop size={20} /> },
        { id: "about", title: "About ERP", icon: <HiOutlineInformationCircle size={20} /> },
    ];

    const wrapper = {
        width: "18rem", // w-72 desktop
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "1.25rem", // p-5
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#1d4ed8", // text-blue-700
        margin: "0 0 1.5rem 0", // mb-6
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    };

    const menuContainer = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem" // space-y-2
    };

    const getButtonStyle = (isActive) => ({
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem", // gap-3
        padding: "0.75rem 1rem", // px-4 py-3
        cursor: "pointer",
        borderRadius: "0.75rem", // rounded-xl
        transition: "all 0.2s ease",
        textAlign: "left",
        border: "none",
        backgroundColor: isActive? "#1d4ed8" : "transparent", // bg-blue-700
        color: isActive? "#ffffff" : "#334155", // text-white / text-gray-700
        boxShadow: isActive? "0 4px 14px rgba(29, 78, 216, 0.25)" : "none",
        fontSize: "0.95rem",
        fontWeight: "500", // font-medium
        boxSizing: "border-box"
    });

    const getButtonHover = (e, isActive) => {
        if (!isActive) {
            e.currentTarget.style.backgroundColor = "#eff6ff"; // hover:bg-blue-50
        }
    };

    const getButtonLeave = (e, isActive) => {
        if (!isActive) {
            e.currentTarget.style.backgroundColor = "transparent";
        }
    };

    return (
        <div style={wrapper} className="settings-sidebar">
            <h2 style={title}>
                ⚙ Settings
            </h2>

            <div style={menuContainer}>
                {menus.map((menu) => {
                    const isActive = activeTab === menu.id;
                    return (
                        <button
                            key={menu.id}
                            onClick={() => setActiveTab(menu.id)}
                            onMouseEnter={(e) => getButtonHover(e, isActive)}
                            onMouseLeave={(e) => getButtonLeave(e, isActive)}
                            style={getButtonStyle(isActive)}
                        >
                            {menu.icon}
                            <span>
                                {menu.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Mobile Responsive: stack vertically full width */}
            <style>{`
                @media (max-width: 1023px) {
                  .settings-sidebar { 
                    width: 100%!important; 
                  }
                }
            `}</style>
        </div>
    );
}