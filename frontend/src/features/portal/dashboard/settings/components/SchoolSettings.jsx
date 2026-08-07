import React, { useRef, useState } from "react";

export default function SchoolSettings() {
    const fileInputRef = useRef(null);

    const [logoPreview, setLogoPreview] = useState("/logoo.png");

    const [school, setSchool] = useState({
        schoolName: "Sound Peace International Schools",
        motto: "Knowledge, Discipline & Excellence",
        principal: "Mr. John Doe",
        email: "info@soundpeace.edu.ng",
        phone: "+234 800 000 0000",
        website: "www.soundpeace.edu.ng",
        address: "Lagos, Nigeria",
        session: "2026/2027",
        color: "#2563eb",
        logo: null,
    });

    const handleChange = (e) => {
        setSchool((prev) => ({
          ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Image size must not exceed 2MB.");
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        setLogoPreview(imageUrl);
        setSchool((prev) => ({
          ...prev,
            logo: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("School Settings:", school);
        alert("School settings saved successfully.");
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

    const headerTitle = {
        fontSize: "clamp(1.5rem, 5vw, 1.875rem)", // text-3xl
        fontWeight: "700",
        color: "#1e293b", // slate-800
        margin: 0,
        lineHeight: 1.3
    };

    const headerSub = {
        color: "#64748b", // gray-500
        marginTop: "0.5rem",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        marginBottom: "2.5rem" // mb-10
    };

    const logoSection = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2rem", // gap-8
        flexWrap: "wrap", // mobile wraps
        marginBottom: "2.5rem"
    };

    const logoImgWrapper = {
        width: "8rem", // w-32
        height: "8rem", // h-32
        borderRadius: "50%",
        overflow: "hidden",
        border: "4px solid #e5e7eb",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        backgroundColor: "#f3f4f6",
        flexShrink: 0
    };

    const logoImg = {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    };

    const btnPrimary = {
        backgroundColor: "#1d4ed8",
        color: "#ffffff",
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
    };

    const btnSave = {
      ...btnPrimary,
        backgroundColor: "#1e40af",
        padding: "0.75rem 2.5rem" // px-10
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
        lineHeight: 1.6,
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff"
    };

    const textareaBase = {
      ...inputBase,
        padding: "1rem" // p-4
    };

    const label = {
        display: "block",
        fontWeight: "600",
        marginBottom: "0.5rem", // mb-2
        color: "#334155",
        fontSize: "0.95rem"
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // 1 col mobile, 2 col desktop
        gap: "1.5rem" // gap-6
    };

    const formSection = {
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem" // space-y-10
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
            {/* Header */}
            <div>
                <h2 style={headerTitle}>
                    School Settings
                </h2>
                <p style={headerSub}>
                    Manage your school's profile and general information.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={formSection}>
                {/* Logo */}
                <div style={logoSection}>
                    <div style={logoImgWrapper}>
                        <img
                            src={logoPreview}
                            alt="School Logo"
                            style={logoImg}
                        />
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                            style={btnPrimary}
                        >
                            Upload School Logo
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            style={{ display: "none" }}
                        />

                        <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
                            PNG, JPG or JPEG (Maximum 2MB)
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div style={grid}>
                    <div>
                        <label style={label}>School Name</label>
                        <input
                            type="text"
                            name="schoolName"
                            value={school.schoolName}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>School Motto</label>
                        <input
                            type="text"
                            name="motto"
                            value={school.motto}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Principal</label>
                        <input
                            type="text"
                            name="principal"
                            value={school.principal}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>School Email</label>
                        <input
                            type="email"
                            name="email"
                            value={school.email}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={school.phone}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Website</label>
                        <input
                            type="text"
                            name="website"
                            value={school.website}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Academic Session</label>
                        <input
                            type="text"
                            name="session"
                            value={school.session}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Theme Colour</label>
                        <input
                            type="color"
                            name="color"
                            value={school.color}
                            onChange={handleChange}
                            style={{...inputBase, height: "3rem", cursor: "pointer", padding: "0.25rem" }}
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label style={label}>School Address</label>
                    <textarea
                        rows={5}
                        name="address"
                        value={school.address}
                        onChange={handleChange}
                        style={textareaBase}
                        {...focusHandlers}
                    />
                </div>

                {/* Save */}
                <div>
                    <button
                        type="submit"
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                        style={btnSave}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}