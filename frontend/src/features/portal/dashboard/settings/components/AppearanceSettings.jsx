import React, { useState } from "react";

export default function AppearanceSettings() {
    const [settings, setSettings] = useState({
        theme: "Blue",
        mode: "Light",
        sidebar: "Expanded",
        fontSize: "Medium",
        primaryColor: "#2563EB",
    });

    const handleChange = (e) => {
        setSettings((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(settings);
        alert("Appearance settings saved successfully.");
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

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // 1 col mobile, 2 col desktop
        gap: "1.5rem" // gap-6
    };

    const label = {
        display: "block",
        marginBottom: "0.5rem", // mb-2
        fontWeight: "500", // font-medium
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

    const colorInput = {
        width: "7rem", // w-28
        height: "3.5rem", // h-14
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem",
        cursor: "pointer",
        padding: "0.25rem"
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

    const previewCard = {
        backgroundColor: "#f8fafc", // bg-gray-50
        borderRadius: "0.75rem", // rounded-xl
        padding: "1.5rem", // p-6
        border: "1px solid #e5e7eb",
        gridColumn: "1 / -1" // md:col-span-2
    };

    const previewBtn = {
        backgroundColor: settings.primaryColor,
        color: "#ffffff",
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "default"
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
                🎨 Appearance Settings
            </h2>

            <form onSubmit={handleSubmit} style={grid}>
                <div>
                    <label style={label}>Theme Color</label>
                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option>Blue</option>
                        <option>Green</option>
                        <option>Purple</option>
                        <option>Orange</option>
                        <option>Red</option>
                    </select>
                </div>

                <div>
                    <label style={label}>Display Mode</label>
                    <select
                        name="mode"
                        value={settings.mode}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                    </select>
                </div>

                <div>
                    <label style={label}>Sidebar Style</label>
                    <select
                        name="sidebar"
                        value={settings.sidebar}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option>Expanded</option>
                        <option>Collapsed</option>
                    </select>
                </div>

                <div>
                    <label style={label}>Font Size</label>
                    <select
                        name="fontSize"
                        value={settings.fontSize}
                        onChange={handleChange}
                        style={inputBase}
                        {...focusHandlers}
                    >
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={label}>Primary Color</label>
                    <input
                        type="color"
                        name="primaryColor"
                        value={settings.primaryColor}
                        onChange={handleChange}
                        style={colorInput}
                    />
                </div>

                <div style={previewCard}>
                    <h3 style={{ fontWeight: "600", marginBottom: "1rem", color: "#0f172a" }}>
                        Live Preview
                    </h3>
                    <button type="button" style={previewBtn}>
                        Sample Button
                    </button>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                    <button
                        type="submit"
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                        style={btnSave}
                    >
                        Save Appearance
                    </button>
                </div>
            </form>
        </div>
    );
}