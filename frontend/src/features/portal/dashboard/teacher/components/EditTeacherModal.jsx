import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useUpdateTeacherMutation } from "../../../../../redux/api/teacherApi";

export default function EditTeacherModal({
    open,
    onClose,
    teacher,
}) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        otherName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        qualification: "",
        specialization: "",
        employmentDate: "",
        address: "",
        status: "Active",
    });

    useEffect(() => {
        if (teacher) {
            setFormData({
                employeeId: teacher.employeeId || "",
                firstName: teacher.firstName || "",
                lastName: teacher.lastName || "",
                otherName: teacher.otherName || "",
                email: teacher.email || "",
                phoneNumber: teacher.phoneNumber || "",
                gender: teacher.gender || "",
                qualification: teacher.qualification || "",
                specialization: teacher.specialization || "",
                employmentDate: teacher.employmentDate
                   ? teacher.employmentDate.slice(0, 10)
                    : "",
                address: teacher.address || "",
                status: teacher.status || "Active",
            });
        }
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
           ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTeacher({
                id: teacher._id,
                data: formData,
            }).unwrap();
            alert("Teacher updated successfully.");
            onClose();
        } catch (err) {
            console.log("FULL ERROR:", err);
        }
    };

    if (!open) return null;

    const inputBaseStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem",
        padding: "0.75rem 1rem",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        height: "48px"
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

    const buttonPrimary = {
        backgroundColor: isLoading? "#93c5fd" : "#1d4ed8",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: "600",
        cursor: isLoading? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: isLoading? 0.7 : 1,
        boxShadow: isLoading? "none" : "0 4px 14px rgba(29, 78, 216, 0.25)",
        fontSize: "0.95rem"
    };

    const buttonSecondary = {
        border: "1px solid #cbd5e1",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.95rem"
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
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
                    borderRadius: "1.5rem",
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)",
                    width: "100%",
                    maxWidth: "52rem",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    padding: "clamp(20px, 4vw, 32px)",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                            fontWeight: "700",
                            color: "#0f172a",
                            margin: 0
                        }}
                    >
                        Edit Teacher
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

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "grid",
                        gridTemplateColumns: isDesktop? "1fr 1fr" : "1fr",
                        gap: "1.25rem"
                    }}
                >
                    <input
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        style={inputBaseStyle}
                        {...focusHandlers}
                        required
                    />

                    <input
                        type="date"
                        name="employmentDate"
                        value={formData.employmentDate}
                        onChange={handleChange}
                        style={inputBaseStyle}
                        {...focusHandlers}
                        required
                    />

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
                        name="otherName"
                        value={formData.otherName}
                        onChange={handleChange}
                        placeholder="Other Name"
                        style={inputBaseStyle}
                        {...focusHandlers}
                    />

                    <input
                        type="email"
                        name="email"
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
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={inputBaseStyle}
                        {...focusHandlers}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="Qualification"
                        style={inputBaseStyle}
                        {...focusHandlers}
                        required
                    />

                    <input
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="Specialization"
                        style={inputBaseStyle}
                        {...focusHandlers}
                        required
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputBaseStyle}
                        {...focusHandlers}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        rows={4}
                        style={{
                           ...inputBaseStyle,
                            gridColumn: isDesktop? "1 / 3" : "1 / 2",
                            height: "120px",
                            resize: "vertical"
                        }}
                        {...focusHandlers}
                        required
                    />

                    <div
                        style={{
                            gridColumn: isDesktop? "1 / 3" : "1 / 2",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                            flexWrap: "wrap",
                            borderTop: "1px solid #f1f5f9",
                            paddingTop: "1.5rem",
                            marginTop: "0.5rem"
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                            style={buttonSecondary}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1e40af"; }}
                            onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                            style={buttonPrimary}
                        >
                            {isLoading? "Updating..." : "Update Teacher"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}