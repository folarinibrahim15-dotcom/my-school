import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useUpdateParentMutation } from "../../../../../redux/api/parentApi";

export default function EditParentModal({
    open,
    onClose,
    parent,
}) {
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
        occupation: "",
        address: "",
        relationship: "",
    });

    useEffect(() => {
        if (parent) {
            setFormData({
                firstName: parent.firstName || "",
                lastName: parent.lastName || "",
                email: parent.email || "",
                phoneNumber: parent.phoneNumber || "",
                occupation: parent.occupation || "",
                address: parent.address || "",
                relationship: parent.relationship || "",
            });
        }
    }, [parent]);

    const [updateParent, { isLoading }] = useUpdateParentMutation();

    const handleChange = (e) => {
        setFormData({
           ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateParent({
                id: parent._id,
               ...formData,
            }).unwrap();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    if (!open) return null;

    const inputBaseStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.75rem 1rem", // p-3
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
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: "clamp(12px, 4vw, 24px)"
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1rem", // rounded-2xl
                    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
                    width: "100%",
                    maxWidth: "42rem", // max-w-2xl
                    maxHeight: "90vh",
                    overflowY: "auto",
                    padding: "clamp(20px, 4vw, 32px)", // p-8
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
                            fontWeight: "700",
                            color: "#0f172a",
                            margin: 0
                        }}
                    >
                        Edit Parent
                    </h2>
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
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        <HiXMark size={24} style={{ color: "#334155" }} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isDesktop? "1fr 1fr" : "1fr", // responsive 2 col
                            gap: "1.25rem", // space-y-5 equivalent
                            marginBottom: "1.5rem"
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

                        <input
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            placeholder="Occupation"
                            style={{...inputBaseStyle, gridColumn: isDesktop? "1 / 3" : "1 / 2" }}
                            {...focusHandlers}
                        />

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            style={{
                               ...inputBaseStyle,
                                gridColumn: isDesktop? "1 / 3" : "1 / 2",
                                resize: "vertical",
                                minHeight: "100px"
                            }}
                            rows="3"
                            {...focusHandlers}
                        />

                        <select
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                            style={{...inputBaseStyle, gridColumn: isDesktop? "1 / 3" : "1 / 2" }}
                            {...focusHandlers}
                            required
                        >
                            <option value="">Select Relationship</option>
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Guardian</option>
                        </select>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem", // gap-4
                            flexWrap: "wrap",
                            borderTop: "1px solid #f1f5f9",
                            paddingTop: "1.5rem"
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
                                backgroundColor: isLoading? "#93c5fd" : "#1d4ed8", // bg-blue-700
                                color: "#ffffff",
                                padding: "0.75rem 2rem", // px-8 py-3
                                borderRadius: "0.75rem", // rounded-xl
                                border: "none",
                                fontWeight: "600",
                                cursor: isLoading? "not-allowed" : "pointer",
                                transition: "all 0.2s ease",
                                opacity: isLoading? 0.7 : 1,
                                boxShadow: isLoading? "none" : "0 4px 14px rgba(29, 78, 216, 0.25)",
                                fontSize: "0.95rem"
                            }}
                        >
                            {isLoading? "Updating..." : "Update Parent"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}