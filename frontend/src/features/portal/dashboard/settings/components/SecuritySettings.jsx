import React, { useState } from "react";

export default function SecuritySettings() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        enable2FA: false,
        sessionTimeout: 30,
        logoutAllDevices: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
           ...prev,
            [name]: type === "checkbox"? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword!== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        console.log(formData);
        alert("Security settings updated successfully.");
    };

    const wrapper = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 2rem)", // p-8 responsive
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
        marginBottom: "2rem" // mb-8
    };

    const formSection = {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem" // space-y-6
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // 1 col mobile, 2 col desktop
        gap: "1.25rem" // gap-5
    };

    const label = {
        display: "block",
        fontWeight: "500", // font-medium
        marginBottom: "0.5rem", // mb-2
        color: "#334155",
        fontSize: "0.95rem"
    };

    const inputBase = {
        width: "100%",
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.875rem 1rem", // p-3
        fontSize: "0.95rem",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease"
    };

    const checkboxCard = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "1rem", // p-4
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff"
    };

    const checkbox = {
        width: "1.25rem", // w-5
        height: "1.25rem", // h-5
        accentColor: "#2563eb",
        cursor: "pointer"
    };

    const activityCard = {
        backgroundColor: "#f8fafc", // bg-gray-50
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem", // rounded-xl
        padding: "1.25rem" // p-5
    };

    const btnSave = {
        backgroundColor: "#1e40af",
        color: "#ffffff",
        padding: "0.75rem 2rem", // px-8 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(30, 64, 175, 0.25)"
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

    return (
        <div style={wrapper}>
            <h2 style={title}>
                🔒 Security Settings
            </h2>

            <form onSubmit={handleSubmit} style={formSection}>
                <div style={grid}>
                    <div>
                        <label style={label}>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Session Timeout (Minutes)</label>
                        <select
                            name="sessionTimeout"
                            value={formData.sessionTimeout}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="60">1 Hour</option>
                            <option value="120">2 Hours</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}> {/* space-y-4 */}
                    <label
                        style={checkboxCard}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2563eb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; }}
                    >
                        <span>Enable Two-Factor Authentication (2FA)</span>
                        <input
                            type="checkbox"
                            name="enable2FA"
                            checked={formData.enable2FA}
                            onChange={handleChange}
                            style={checkbox}
                        />
                    </label>

                    <label
                        style={checkboxCard}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2563eb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; }}
                    >
                        <span>Logout from all devices after saving</span>
                        <input
                            type="checkbox"
                            name="logoutAllDevices"
                            checked={formData.logoutAllDevices}
                            onChange={handleChange}
                            style={checkbox}
                        />
                    </label>
                </div>

                <div style={activityCard}>
                    <h3 style={{ fontWeight: "600", marginBottom: "0.75rem", color: "#0f172a" }}>
                        Recent Login Activity
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <li style={{ fontSize: "0.9rem", color: "#475569" }}>
                            ✔ Windows 11 — Chrome — Today 10:35 AM
                        </li>
                        <li style={{ fontSize: "0.9rem", color: "#475569" }}>
                            ✔ Android — Chrome — Yesterday 8:12 PM
                        </li>
                        <li style={{ fontSize: "0.9rem", color: "#475569" }}>
                            ✔ Windows 11 — Edge — 3 Days Ago
                        </li>
                    </ul>
                </div>

                <button
                    type="submit"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                    style={btnSave}
                >
                    Save Security Settings
                </button>
            </form>
        </div>
    );
}