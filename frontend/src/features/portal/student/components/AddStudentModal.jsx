import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useCreateStudentMutation } from "../../../../redux/api/studentApi";

export default function AddStudentModal({ open, onClose }) {
    const [createStudent, { isLoading }] =
        useCreateStudentMutation();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        otherName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        class: "",
        session: "",
        address: "",
        password: "",
    });

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await createStudent(formData).unwrap();

            alert("Student created successfully!");

            setFormData({
                firstName: "",
                lastName: "",
                otherName: "",
                email: "",
                phoneNumber: "",
                gender: "",
                dateOfBirth: "",
                class: "",
                session: "",
                address: "",
                password: "",
            });

            onClose();
        } catch (err) {
            alert(err?.data?.message || "Something went wrong.");
        }
    };

   return (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // bg-black/40
            backdropFilter: 'blur(8px)', // backdrop-blur-sm
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(12px, 4vw, 24px)', // p-6 responsive
            boxSizing: 'border-box'
        }}
        onClick={onClose} // close on backdrop click
    >
        <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking modal
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1.5rem', // rounded-3xl
                boxShadow: '0 25px 50px rgba(15, 23, 42, 0.15)', // shadow-2xl
                width: '100%',
                maxWidth: '72rem', // max-w-6xl
                maxHeight: '95vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 32px)', // px-8 py-6
                    borderBottom: '1px solid #e5e7eb'
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', // text-3xl responsive
                            fontWeight: '700',
                            color: '#0f172a',
                            margin: 0,
                            lineHeight: 1.2
                        }}
                    >
                        Add Student
                    </h2>
                    <p
                        style={{
                            color: '#64748b', // text-gray-500
                            marginTop: '0.25rem', // mt-1
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            margin: '0.25rem 0 0 0'
                        }}
                    >
                        Register a new student.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    style={{
                        height: '3rem', // h-12
                        width: '3rem', // w-12
                        borderRadius: '0.75rem', // rounded-xl
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    <HiXMark style={{ fontSize: '1.5rem', color: '#334155' }} /> {/* text-2xl */}
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: 'clamp(20px, 4vw, 32px)' }}> {/* p-8 */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // 1 col mobile, 2 col md+
                        gap: '1.5rem', // gap-6
                        width: '100%'
                    }}
                >
                    {[
                        { name: "firstName", placeholder: "First Name", value: formData.firstName, type: "text" },
                        { name: "lastName", placeholder: "Last Name", value: formData.lastName, type: "text" },
                        { name: "otherName", placeholder: "Other Name", value: formData.otherName, type: "text" },
                        { name: "email", placeholder: "Email", value: formData.email, type: "email" },
                        { name: "phoneNumber", placeholder: "Phone Number", value: formData.phoneNumber, type: "tel" },
                        { name: "class", placeholder: "Class", value: formData.class, type: "text" },
                        { name: "session", placeholder: "Academic Session", value: formData.session, type: "text" },
                        { name: "dateOfBirth", placeholder: "Date of Birth", value: formData.dateOfBirth, type: "date" },
                        { name: "address", placeholder: "Address", value: formData.address, type: "text" },
                    ].map((field) => (
                        <input
                            key={field.name}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            type={field.type}
                            style={{
                                border: '1px solid #cbd5e1',
                                borderRadius: '0.75rem', // rounded-xl
                                padding: '1rem', // p-4
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                        />
                    ))}

                    {/* Gender Select */}
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            width: '100%',
                            boxSizing: 'border-box',
                            backgroundColor: '#ffffff'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    {/* Password - spans 2 cols on desktop */}
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        style={{
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            width: '100%',
                            boxSizing: 'border-box',
                            gridColumn: window.innerWidth >= 768 ? 'span 2' : 'span 1' // md:col-span-2
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    borderTop: '1px solid #e5e7eb',
                    padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 32px)', // px-8 py-6
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem', // gap-4
                    flexWrap: 'wrap'
                }}
            >
                <button
                    onClick={onClose}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                    style={{
                        padding: '0.75rem 1.5rem', // px-6 py-3
                        borderRadius: '0.75rem', // rounded-xl
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#1e40af'; }}
                    onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                    style={{
                        backgroundColor: isLoading ? '#60a5fa' : '#1d4ed8', // bg-blue-700 : disabled:bg-blue-400
                        color: '#ffffff',
                        padding: '0.75rem 2rem', // px-8 py-3
                        borderRadius: '0.75rem', // rounded-xl
                        border: 'none',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                        boxShadow: isLoading ? 'none' : '0 4px 14px rgba(29, 78, 216, 0.25)'
                    }}
                >
                    {isLoading ? "Saving..." : "Save Student"}
                </button>
            </div>
        </div>
    </div>
);
}