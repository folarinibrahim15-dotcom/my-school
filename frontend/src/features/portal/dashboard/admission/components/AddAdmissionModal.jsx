import React, { useState } from "react";
import { HiXMark, HiPlusCircle } from "react-icons/hi2";
import { useCreateAdmissionMutation } from "../../../../../redux/api/admissionApi";

export default function AddAdmissionModal({ open, onClose }) {
    const [createAdmission, { isLoading }] = useCreateAdmissionMutation();

    const initialState = {
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "",
        dateOfBirth: "",
        hometown: "",
        lga: "",
        stateOfOrigin: "",
        religion: "",
        denomination: "",
        classApplyingFor: "",
        previousSchool: "",
        previousSchoolAddress: "",
        reasonForLeaving: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        allergies: "",
        childrenEnrolled: "",
        status: "Pending",
        remarks: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAdmission(formData).unwrap();
            setFormData(initialState);
            onClose();
        } catch (err) {
            console.log("FULL ERROR:", err);
            console.log("STATUS:", err.status);
            console.log("DATA:", err.data);
        }
    };

    if (!open) return null;

    const inputStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem",
        padding: "0.875rem 1rem",
        fontSize: "0.95rem",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        background: "#fff",
        transition: "0.2s",
        fontFamily: "inherit",
    };

    const textareaStyle = {
       ...inputStyle,
        resize: "vertical",
        minHeight: "100px",
    };

    const focusHandlers = {
        onFocus: (e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,.12)";
        },
        onBlur: (e) => {
            e.target.style.borderColor = "#cbd5e1";
            e.target.style.boxShadow = "none";
        },
    };

    const buttonPrimary = {
        background: isLoading? "#93c5fd" : "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "14px 22px",
        cursor: isLoading? "not-allowed" : "pointer",
        fontWeight: 600,
        opacity: isLoading? 0.7 : 1,
    };

    const buttonSecondary = {
        background: "#fff",
        border: "1px solid #cbd5e1",
        borderRadius: "12px",
        padding: "14px 22px",
        cursor: "pointer",
        fontWeight: 600,
    };

    const overlay = {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        zIndex: 999,
    };

    const modal = {
        width: "100%",
        maxWidth: "1100px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#fff",
        borderRadius: "24px",
        padding: "30px",
        boxShadow: "0 25px 50px rgba(0,0,0,.15)",
    };

    const header = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
    };

    const titleWrap = {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    };

    const formGrid = {
        display: "grid",
        gridTemplateColumns: "1fr", // mobile vertical
        gap: "20px",
    };

    const formGridDesktop = `
        @media (min-width: 768px) {
           .admission-grid { grid-template-columns: repeat(2, 1fr)!important; }
        }
        @media (min-width: 1024px) {
           .admission-grid { grid-template-columns: repeat(3, 1fr)!important; }
        }
    `;

    const sectionTitle = {
        gridColumn: "1 / -1",
        fontSize: "1.125rem",
        fontWeight: 700,
        color: "#0f172a",
        marginTop: "10px",
        marginBottom: "5px"
    };

    const actions = {
        gridColumn: "1 / -1",
        display: "flex",
        justifyContent: "flex-end",
        gap: "1rem",
        marginTop: "0.75rem",
        flexWrap: "wrap"
    };

    return (
        <>
            <style>{formGridDesktop}</style>
            <div onClick={onClose} style={overlay}>
                <div onClick={(e) => e.stopPropagation()} style={modal}>
                    {/* Header */}
                    <div style={header}>
                        <div style={titleWrap}>
                            <HiPlusCircle size={30} color="#2563eb" />
                            <h2 style={{ margin: 0, fontWeight: 700, fontSize: "28px" }}>
                                New Admission
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ border: "none", background: "transparent", cursor: "pointer" }}
                        >
                            <HiXMark size={28} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="admission-grid" style={formGrid}>
                        {/* Student Information */}
                        <h3 style={sectionTitle}>Student Information</h3>

                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={inputStyle} {...focusHandlers} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={inputStyle} {...focusHandlers} required />
                        <input type="text" name="middleName" placeholder="Middle Name (Optional)" value={formData.middleName} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle} {...focusHandlers} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={inputStyle} {...focusHandlers} required />
                        <input type="text" name="hometown" placeholder="Hometown" value={formData.hometown} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="lga" placeholder="Local Government Area" value={formData.lga} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="stateOfOrigin" placeholder="State of Origin" value={formData.stateOfOrigin} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="denomination" placeholder="Denomination" value={formData.denomination} onChange={handleChange} style={inputStyle} {...focusHandlers} />

                        {/* Admission Information */}
                        <h3 style={sectionTitle}>Admission Information</h3>
                        <input type="text" name="classApplyingFor" placeholder="Class Applying For" value={formData.classApplyingFor} onChange={handleChange} style={inputStyle} {...focusHandlers} required />
                        <input type="text" name="previousSchool" placeholder="Previous School" value={formData.previousSchool} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="previousSchoolAddress" placeholder="Previous School Address" value={formData.previousSchoolAddress} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <textarea name="reasonForLeaving" placeholder="Reason For Leaving Previous School" value={formData.reasonForLeaving} onChange={handleChange} style={{...textareaStyle, gridColumn: "1 / -1" }} {...focusHandlers} />

                        {/* Parent / Guardian Information */}
                        <h3 style={sectionTitle}>Parent / Guardian Information</h3>
                        <input type="text" name="parentName" placeholder="Parent / Guardian Name" value={formData.parentName} onChange={handleChange} style={inputStyle} {...focusHandlers} required />
                        <input type="email" name="parentEmail" placeholder="Parent Email Address" value={formData.parentEmail} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="parentPhone" placeholder="Parent Phone Number" value={formData.parentPhone} onChange={handleChange} style={inputStyle} {...focusHandlers} />

                        {/* Medical & Others */}
                        <h3 style={sectionTitle}>Additional Information</h3>
                        <input type="text" name="allergies" placeholder="Allergies (Optional)" value={formData.allergies} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <input type="text" name="childrenEnrolled" placeholder="Other Children Enrolled" value={formData.childrenEnrolled} onChange={handleChange} style={inputStyle} {...focusHandlers} />
                        <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} style={{...textareaStyle, gridColumn: "1 / -1" }} {...focusHandlers} />

                        {/* Status */}
                        <select name="status" value={formData.status} onChange={handleChange} style={inputStyle} {...focusHandlers}>
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Admitted">Admitted</option>
                        </select>

                        {/* Actions */}
                        <div style={actions}>
                            <button type="button" onClick={onClose} style={buttonSecondary}>
                                Cancel
                            </button>
                            <button type="submit" disabled={isLoading} style={buttonPrimary}>
                                {isLoading? "Creating Admission..." : "Create Admission"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}