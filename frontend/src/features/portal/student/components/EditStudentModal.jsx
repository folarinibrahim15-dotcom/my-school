import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useUpdateStudentMutation } from "../../../../redux/api/studentApi";

export default function EditStudentModal({
  open,
  onClose,
  student,
}) {
  const [updateStudent, { isLoading }] =
    useUpdateStudentMutation();

  /*
  |--------------------------------------------------------------------------
  | Responsive Screen
  |--------------------------------------------------------------------------
  */

  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const resize = () =>
      setScreenWidth(window.innerWidth);

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener(
        "resize",
        resize
      );
  }, []);

  const isMobile = screenWidth < 768;

  /*
  |--------------------------------------------------------------------------
  | Form Data
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    class: "",
    session: "",
    address: "",
    dateOfBirth: "",
    admissionStatus: "Pending",
    paymentStatus: "Pending",
  });

  /*
  |--------------------------------------------------------------------------
  | Populate Form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!student) return;

    setFormData({
      firstName:
        student.firstName || "",

      lastName:
        student.lastName || "",

      otherName:
        student.otherName || "",

      email:
        student.email || "",

      phoneNumber:
        student.phoneNumber || "",

      gender:
        student.gender || "Male",

      class:
        student.class || "",

      session:
        student.session || "",

      address:
        student.address || "",

      dateOfBirth:
        student.dateOfBirth
          ? student.dateOfBirth.substring(0, 10)
          : "",

      admissionStatus:
        student.admissionStatus ||
        "Pending",

      paymentStatus:
        student.paymentStatus ||
        "Pending",
    });
  }, [student]);

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

    if (!student?._id) return;

    try {
      await updateStudent({
        id: student._id,
        ...formData,
      }).unwrap();

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Reusable Styles
  |--------------------------------------------------------------------------
  */

  const inputStyle = {
    width: "100%",
    height: 52,

    border: "1px solid #CBD5E1",

    borderRadius: 12,

    padding: "0 16px",

    outline: "none",

    fontSize: 15,

    boxSizing: "border-box",

    transition: ".25s",

    background: "#FFFFFF",
  };

  const textareaStyle = {
    ...inputStyle,

    height: 120,

    padding: 16,

    resize: "vertical",

    fontFamily: "inherit",
  };

  const focusStyle = (e) => {
    e.target.style.borderColor =
      "#2563EB";

    e.target.style.boxShadow =
      "0 0 0 3px rgba(37,99,235,.15)";
  };

  const blurStyle = (e) => {
    e.target.style.borderColor =
      "#CBD5E1";

    e.target.style.boxShadow = "none";
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background:
          "rgba(15,23,42,.45)",

        backdropFilter: "blur(8px)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: isMobile ? 12 : 24,

        zIndex: 999,

        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "100%",

          maxWidth: 1050,

          maxHeight: "95vh",

          overflowY: "auto",

          background: "#FFFFFF",

          borderRadius: 24,

          boxShadow:
            "0 30px 60px rgba(15,23,42,.18)",

          boxSizing: "border-box",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            padding: isMobile
              ? 20
              : 28,

            borderBottom:
              "1px solid #E5E7EB",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,

                fontSize: isMobile
                  ? 24
                  : 30,

                fontWeight: 700,

                color: "#0F172A",
              }}
            >
              Edit Student
            </h2>

            <p
              style={{
                marginTop: 6,

                color: "#64748B",

                fontSize: 15,
              }}
            >
              Update student information.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              border: "none",

              background: "transparent",

              cursor: "pointer",

              borderRadius: 10,

              padding: 8,
            }}
          >
            <HiXMark size={30} />
          </button>
        </div>

        {/* Form starts here */}

        <form
          onSubmit={handleSubmit}
          style={{
            padding: isMobile
              ? 18
              : 30,
          }}
        >

                      <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {/* First Name */}

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Last Name */}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Other Name */}

            <input
              type="text"
              name="otherName"
              placeholder="Other Name"
              value={formData.otherName}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Phone */}

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Class */}

            <input
              type="text"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Session */}

            <input
              type="text"
              name="session"
              placeholder="Academic Session"
              value={formData.session}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Date of Birth */}

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            />

            {/* Gender */}

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            >
              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>
            </select>

            {/* Admission */}

            <select
              name="admissionStatus"
              value={formData.admissionStatus}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Admitted">
                Admitted
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

            {/* Payment */}

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={inputStyle}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>
            </select>

            {/* Empty grid space on desktop */}

            {!isMobile && <div />}

            {/* Address */}

            <textarea
              name="address"
              placeholder="Residential Address"
              value={formData.address}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={{
                ...textareaStyle,
                gridColumn: isMobile
                  ? "span 1"
                  : "span 2",
              }}
            />
          </div>

                    {/* Footer */}

          <div
            style={{
              display: "flex",
              justifyContent: isMobile
                ? "stretch"
                : "flex-end",
              flexDirection: isMobile
                ? "column"
                : "row",
              gap: 16,
              marginTop: 32,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                height: 52,
                padding: "0 24px",
                borderRadius: 12,
                border: "1px solid #CBD5E1",
                background: "#FFFFFF",
                color: "#334155",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: ".25s",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "#FFFFFF";
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                height: 52,
                padding: "0 28px",
                border: "none",
                borderRadius: 12,
                background: isLoading
                  ? "#93C5FD"
                  : "#2563EB",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                cursor: isLoading
                  ? "not-allowed"
                  : "pointer",
                transition: ".25s",
                boxShadow: isLoading
                  ? "none"
                  : "0 8px 20px rgba(37,99,235,.25)",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background =
                    "#1D4ED8";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background =
                    "#2563EB";
                }
              }}
            >
              {isLoading
                ? "Updating Student..."
                : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}