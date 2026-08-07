import React, { useEffect, useState } from "react";
import {
    HiXMark,
    HiPencilSquare,
} from "react-icons/hi2";

import {
    useUpdateAdmissionMutation,
} from "../../../../../redux/api/admissionApi";

export default function EditAdmissionModal({
    open,
    onClose,
    admission,
}) {

    const [
        updateAdmission,
        {
            isLoading,
        },
    ] = useUpdateAdmissionMutation();

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [formData, setFormData] = useState({

        // Student

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

        // Previous School

        previousSchool: "",
        previousSchoolAddress: "",
        reasonForLeaving: "",

        // Admission

        classApplyingFor: "",

        // Medical

        allergies: "",
        childrenEnrolled: "",

        // Parent

        parentName: "",
        parentEmail: "",
        parentPhone: "",

        // Workflow

        status: "Pending",
        remarks: "",

    });

    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!admission) return;

        setFormData({

            firstName:
                admission.firstName || "",

            lastName:
                admission.lastName || "",

            middleName:
                admission.middleName || "",

            gender:
                admission.gender || "",

            dateOfBirth:
                admission.dateOfBirth
                    ? admission.dateOfBirth.substring(0, 10)
                    : "",

            hometown:
                admission.hometown || "",

            lga:
                admission.lga || "",

            stateOfOrigin:
                admission.stateOfOrigin || "",

            religion:
                admission.religion || "",

            denomination:
                admission.denomination || "",

            previousSchool:
                admission.previousSchool || "",

            previousSchoolAddress:
                admission.previousSchoolAddress || "",

            reasonForLeaving:
                admission.reasonForLeaving || "",

            classApplyingFor:
                admission.classApplyingFor || "",

            allergies:
                admission.allergies || "",

            childrenEnrolled:
                admission.childrenEnrolled || "",

            parentName:
                admission.parentName || "",

            parentEmail:
                admission.parentEmail || "",

            parentPhone:
                admission.parentPhone || "",

            status:
                admission.status || "Pending",

            remarks:
                admission.remarks || "",

        });

    }, [admission]);

    /*
    |--------------------------------------------------------------------------
    | Input Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateAdmission({

                id: admission._id,

                data: formData,

            }).unwrap();

            onClose();

        } catch (err) {

            console.error("Update Error:", err);

        }

    };

    if (!open) return null;

    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const inputStyle = {

        width: "100%",

        padding: "14px 16px",

        border: "1px solid #CBD5E1",

        borderRadius: "12px",

        outline: "none",

        fontSize: "15px",

        background: "#FFFFFF",

        transition: "0.25s",

        boxSizing: "border-box",

        fontFamily: "inherit",

    };

    const textareaStyle = {

        ...inputStyle,

        resize: "vertical",

        minHeight: "120px",

    };

    const focusHandlers = {

        onFocus: (e) => {

            e.target.style.borderColor = "#2563EB";

            e.target.style.boxShadow =
                "0 0 0 3px rgba(37,99,235,.15)";

        },

        onBlur: (e) => {

            e.target.style.borderColor = "#CBD5E1";

            e.target.style.boxShadow = "none";

        },

    };

    const primaryButton = {

        background: "#2563EB",

        color: "#FFFFFF",

        border: "none",

        padding: "14px 22px",

        borderRadius: "12px",

        cursor: isLoading
            ? "not-allowed"
            : "pointer",

        fontWeight: 600,

        opacity: isLoading ? 0.7 : 1,

    };

    const secondaryButton = {

        background: "#FFFFFF",

        border: "1px solid #CBD5E1",

        padding: "14px 22px",

        borderRadius: "12px",

        cursor: "pointer",

        fontWeight: 600,

    };

        return (

        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,23,42,.55)",
                backdropFilter: "blur(8px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                zIndex: 9999,
            }}
        >

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "1100px",
                    maxHeight: "92vh",
                    overflowY: "auto",
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    boxShadow:
                        "0 30px 80px rgba(0,0,0,.18)",
                    padding: "32px",
                    boxSizing: "border-box",
                }}
            >

                {/* =======================================
                    Header
                ======================================== */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "30px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >

                        <HiPencilSquare
                            size={30}
                            color="#2563EB"
                        />

                        <div>

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "28px",
                                    fontWeight: 700,
                                    color: "#0F172A",
                                }}
                            >
                                Edit Admission
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#64748B",
                                    fontSize: "15px",
                                }}
                            >
                                Update student admission information.
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "#F8FAFC",
                            borderRadius: "12px",
                            width: "44px",
                            height: "44px",
                            cursor: "pointer",
                        }}
                    >
                        <HiXMark
                            size={24}
                            color="#334155"
                        />
                    </button>

                </div>

                {/* =======================================
                    FORM
                ======================================== */}

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "grid",
                        gap: "30px",
                    }}
                >

                    {/* =======================================
                        Student Information
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: 700,
                            }}
                        >
                            Student Information
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <input
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="middleName"
                                placeholder="Middle Name"
                                value={formData.middleName}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            >
                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                            </select>

                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="classApplyingFor"
                                placeholder="Class Applying For"
                                value={formData.classApplyingFor}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                        </div>

                    </div>
                    {/* =======================================
                        Location Information
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Location Information
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <input
                                name="hometown"
                                placeholder="Hometown"
                                value={formData.hometown}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="lga"
                                placeholder="Local Government Area"
                                value={formData.lga}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="stateOfOrigin"
                                placeholder="State of Origin"
                                value={formData.stateOfOrigin}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                        </div>

                    </div>

                    {/* =======================================
                        Religion
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Religion
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <input
                                name="religion"
                                placeholder="Religion"
                                value={formData.religion}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="denomination"
                                placeholder="Denomination"
                                value={formData.denomination}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                        </div>

                    </div>

                    {/* =======================================
                        Previous School
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Previous School
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <input
                                name="previousSchool"
                                placeholder="Previous School"
                                value={formData.previousSchool}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="previousSchoolAddress"
                                placeholder="Previous School Address"
                                value={formData.previousSchoolAddress}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <textarea
                                name="reasonForLeaving"
                                placeholder="Reason For Leaving"
                                value={formData.reasonForLeaving}
                                onChange={handleChange}
                                rows={4}
                                style={{
                                    ...textareaStyle,
                                    gridColumn: "1 / -1",
                                }}
                                {...focusHandlers}
                            />

                        </div>

                    </div>

                    {/* =======================================
                        Medical Information
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Medical Information
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <select
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            >
                                <option value="">
                                    Allergies?
                                </option>

                                <option value="Yes">
                                    Yes
                                </option>

                                <option value="No">
                                    No
                                </option>

                            </select>

                            <select
                                name="childrenEnrolled"
                                value={formData.childrenEnrolled}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            >
                                <option value="">
                                    Other Children Enrolled?
                                </option>

                                <option value="Yes">
                                    Yes
                                </option>

                                <option value="No">
                                    No
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* =======================================
                        Parent / Guardian
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Parent / Guardian
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <input
                                name="parentName"
                                placeholder="Parent Name"
                                value={formData.parentName}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                type="email"
                                name="parentEmail"
                                placeholder="Parent Email"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                            <input
                                name="parentPhone"
                                placeholder="Parent Phone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            />

                        </div>

                    </div>

                                        {/* =======================================
                        Admission Review
                    ======================================== */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "20px",
                                color: "#1E3A8A",
                                fontSize: "20px",
                                fontWeight: "700",
                            }}
                        >
                            Admission Review
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(250px,1fr))",
                                gap: "20px",
                            }}
                        >

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={inputStyle}
                                {...focusHandlers}
                            >
                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Under Review">
                                    Under Review
                                </option>

                                <option value="Approved">
                                    Approved
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                                <option value="Admitted">
                                    Admitted
                                </option>

                            </select>

                        </div>

                        <textarea
                            name="remarks"
                            placeholder="Administrator Remarks..."
                            value={formData.remarks}
                            onChange={handleChange}
                            rows={5}
                            style={{
                                ...textareaStyle,
                                marginTop: "20px",
                                width: "100%",
                            }}
                            {...focusHandlers}
                        />

                    </div>

                    {/* =======================================
                        Footer Buttons
                    ======================================== */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "16px",
                            marginTop: "10px",
                            flexWrap: "wrap",
                        }}
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            style={secondaryButton}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={primaryButton}
                        >
                            {isLoading
                                ? "Updating..."
                                : "Update Admission"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}
