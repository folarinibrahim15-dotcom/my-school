import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { useCreateParentMutation } from "../../../../../redux/api/parentApi";

export default function AddParentModal({
    open,
    onClose,
}) {
    const [createParent, { isLoading }] = useCreateParentMutation();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        relationship: "Father",
        occupation: "",
        address: "",
    });

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createParent(formData).unwrap();
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                relationship: "Father",
                occupation: "",
                address: "",
            });
            onClose();
        }
        catch (err) {
            console.log(err);
        }
    };

    const inputBaseStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "1rem", // p-4
        fontSize: "0.95rem",
        lineHeight: 1.6,
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit"
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
        <div 
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)", // bg-black/40
                backdropFilter: "blur(8px)", // backdrop-blur-sm
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: "clamp(12px, 4vw, 24px)" // p-6 responsive
            }}
            onClick={onClose}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1.5rem", // rounded-3xl
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)", // shadow-2xl
                    width: "100%",
                    maxWidth: "60rem", // max-w-5xl
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div 
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #e5e7eb",
                        padding: "clamp(20px, 4vw, 32px)" // p-8
                    }}
                >
                    <div>
                        <h2 
                            style={{
                                fontSize: "clamp(1.5rem, 4vw, 1.875rem)", // text-3xl
                                fontWeight: "700",
                                color: "#0f172a",
                                margin: 0,
                                lineHeight: 1.2
                            }}
                        >
                            Add Parent
                        </h2>
                        <p 
                            style={{
                                color: "#64748b", // text-gray-500
                                margin: "0.5rem 0 0 0",
                                fontSize: "0.95rem",
                                lineHeight: 1.6
                            }}
                        >
                            Register Parent / Guardian
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.75rem",
                            transition: "background-color 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <HiXMark size={28} style={{ color: "#334155" }} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div 
                        style={{
                            padding: "clamp(20px, 4vw, 32px)", // p-8
                            display: "grid",
                            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", // md:grid-cols-2
                            gap: "1.5rem" // gap-6
                        }}
                    >
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            style={inputBaseStyle}
                            {...focusHandlers}
                            required
                        />

                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            style={inputBaseStyle}
                            {...focusHandlers}
                            required
                        />

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            style={inputBaseStyle}
                            {...focusHandlers}
                            required
                        />

                        <input
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            style={inputBaseStyle}
                            {...focusHandlers}
                            required
                        />

                        <select
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                            style={inputBaseStyle}
                            {...focusHandlers}
                        >
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Guardian</option>
                        </select>

                        <input
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            placeholder="Occupation"
                            style={inputBaseStyle}
                            {...focusHandlers}
                        />

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            style={{ 
                                ...inputBaseStyle, 
                                gridColumn: isDesktop ? "1 / 3" : "1 / 2", // md:col-span-2
                                resize: "vertical",
                                minHeight: "120px"
                            }}
                            rows="4"
                            {...focusHandlers}
                            required
                        />
                    </div>

                    <div 
                        style={{
                            borderTop: "1px solid #e5e7eb",
                            padding: "clamp(20px, 4vw, 32px)", // p-8
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem", // gap-4
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                            style={{
                                border: "1px solid #cbd5e1",
                                padding: "0.75rem 1.5rem", // px-6 py-3
                                borderRadius: "0.75rem", // rounded-xl
                                backgroundColor: "#ffffff",
                                color: "#334155",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontSize: "0.95rem"
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1e40af"; }}
                            onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                            style={{
                                backgroundColor: isLoading ? "#93c5fd" : "#1d4ed8", // bg-blue-700
                                color: "#ffffff",
                                padding: "0.75rem 2rem", // px-8 py-3
                                borderRadius: "0.75rem", // rounded-xl
                                border: "none",
                                fontWeight: "600",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                transition: "all 0.2s ease",
                                opacity: isLoading ? 0.7 : 1,
                                boxShadow: isLoading ? "none" : "0 4px 14px rgba(29, 78, 216, 0.25)",
                                fontSize: "0.95rem"
                            }}
                        >
                            {isLoading ? "Saving..." : "Save Parent"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}