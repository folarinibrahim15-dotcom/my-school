import React, { useState } from "react";

export default function BackupRestoreSettings() {
    const [settings, setSettings] = useState({
        autoBackup: true,
        frequency: "Daily",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings((prev) => ({
           ...prev,
            [name]: type === "checkbox"? checked : value,
        }));
    };

    const handleBackup = () => {
        alert("Database backup started successfully.");
    };

    const handleDownload = () => {
        alert("Downloading latest backup...");
    };

    const handleRestore = () => {
        const confirmRestore = window.confirm(
            "Restoring a backup will overwrite the current database.\n\nDo you want to continue?"
        );
        if (confirmRestore) {
            alert("Backup restored successfully.");
        }
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
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // 1 col mobile, 2 col desktop
        gap: "1.5rem" // gap-6
    };

    const card = {
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem", // rounded-xl
        padding: "1.25rem", // p-5
        backgroundColor: "#ffffff"
    };

    const cardTitle = {
        fontWeight: "600",
        marginBottom: "1rem", // mb-4
        color: "#0f172a",
        fontSize: "1rem"
    };

    const checkboxRow = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.25rem" // mb-5
    };

    const label = {
        display: "block",
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
        backgroundColor: "#ffffff"
    };

    const checkbox = {
        width: "1.25rem", // w-5
        height: "1.25rem", // h-5
        accentColor: "#2563eb",
        cursor: "pointer"
    };

    const infoText = {
        margin: "0.5rem 0 0 0", // mt-2
        fontSize: "0.95rem",
        color: "#334155"
    };

    const btnGroup = {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem", // gap-4
        marginTop: "2rem" // mt-8
    };

    const btnBase = {
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s ease"
    };

    const btnBlue = {...btnBase, backgroundColor: "#1e40af", color: "#fff" };
    const btnGreen = {...btnBase, backgroundColor: "#15803d", color: "#fff" };
    const btnGray = {...btnBase, backgroundColor: "#374151", color: "#fff" };
    const btnRed = {...btnBase, backgroundColor: "#dc2626", color: "#fff" };

    return (
        <div style={wrapper}>
            <h2 style={title}>
                💾 Backup & Restore
            </h2>

            <div style={grid}>
                {/* Automatic Backup Card */}
                <div style={card}>
                    <h3 style={cardTitle}>Automatic Backup</h3>

                    <label style={checkboxRow}>
                        <span>Enable Automatic Backup</span>
                        <input
                            type="checkbox"
                            name="autoBackup"
                            checked={settings.autoBackup}
                            onChange={handleChange}
                            style={checkbox}
                        />
                    </label>

                    <label style={label}>Backup Frequency</label>
                    <select
                        name="frequency"
                        value={settings.frequency}
                        onChange={handleChange}
                        style={inputBase}
                    >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>

                {/* Last Backup Card */}
                <div style={card}>
                    <h3 style={cardTitle}>Last Backup</h3>

                    <p style={infoText}>
                        Date:
                        <span style={{ fontWeight: "500", marginLeft: "0.5rem" }}>
                            02 Aug 2026
                        </span>
                    </p>

                    <p style={infoText}>
                        Time:
                        <span style={{ fontWeight: "500", marginLeft: "0.5rem" }}>
                            12:30 AM
                        </span>
                    </p>

                    <p style={infoText}>
                        Status:
                        <span style={{ color: "#16a34a", fontWeight: "600", marginLeft: "0.5rem" }}>
                            Successful
                        </span>
                    </p>
                </div>
            </div>

            <div style={btnGroup}>
                <button
                    onClick={handleBackup}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                    style={btnBlue}
                >
                    Create Backup
                </button>

                <button
                    onClick={handleDownload}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#166534"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; }}
                    style={btnGreen}
                >
                    Download Backup
                </button>

                <label
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1f2937"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#374151"; }}
                    style={{...btnGray, display: "inline-block" }}
                >
                    Upload Backup
                    <input type="file" style={{ display: "none" }} />
                </label>

                <button
                    onClick={handleRestore}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#b91c1c"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#dc2626"; }}
                    style={btnRed}
                >
                    Restore Database
                </button>
            </div>
        </div>
    );
}