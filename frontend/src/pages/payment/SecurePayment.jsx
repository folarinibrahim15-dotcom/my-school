import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  GraduationCap,
  School,
  CreditCard,
  FileText,
  Wallet,
  ArrowRight,
} from "lucide-react";
import {
  useInitializeSchoolFeesPaymentMutation,
} from "../../redux/api/paymentApi";
export default function SecurePayment() {
    const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: 600,
  marginBottom: "8px",
  color: "#374151",
};

const errorStyle = {
  color: "#DC2626",
  fontSize: "13px",
};

const getInputStyle = (error) => ({
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border:`2px solid ${error?"#DC2626":"#D1D5DB"}`,
    boxShadow:error
    ?"0 0 0 4px rgba(220,38,38,.15)"
    :"none",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
  background: "#fff",
});
  const navigate = useNavigate();
  const [isHover,setIsHover]=useState(false);

//   const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    payerName: "",
    email: "",
    phone: "",

    studentName: "",
    admissionNumber: "",
    studentClass: "",

    paymentCategory: "",
    amount: "",
    breakdown: "",
  });

  const [errors, setErrors] = useState({});
    const [
  initializeSchoolFeesPayment,
  { isLoading },
] = useInitializeSchoolFeesPaymentMutation();

  const categories = [
    "School Fees",
    "PTA Levy",
    "Uniform",
    "Books",
    "Exercise Books",
    "Transport",
    "Pocket Money",
    "Hostel",
    "Examination",
    "Miscellaneous",
  ];

  const classes = [
    "JS 1",
    "JS 2",
    "JS 3",
    "SS 1",
    "SS 2",
    "SS 3",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.payerName.trim())
      newErrors.payerName = "Payer name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";

    if (!formData.studentName.trim())
      newErrors.studentName = "Student name is required";

    if (!formData.studentClass)
      newErrors.studentClass = "Select a class";

    if (!formData.paymentCategory)
      newErrors.paymentCategory = "Choose payment category";

    if (!formData.amount)
      newErrors.amount = "Enter payment amount";

    if (!formData.breakdown.trim())
      newErrors.breakdown = "Provide payment breakdown";

    setErrors(newErrors);
    const firstError = Object.keys(newErrors)[0];

if(firstError){

const element=document.getElementsByName(firstError)[0];

element?.scrollIntoView({

behavior:"smooth",

block:"center"

});

element?.focus();

}

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
const response = await initializeSchoolFeesPayment({
  payerName: formData.payerName,
  email: formData.email,
  phone: formData.phone,

  studentName: formData.studentName,
  admissionNumber: formData.admissionNumber, // <-- Add this
  studentClass: formData.studentClass,

  paymentCategory: formData.paymentCategory,
  amount: Number(formData.amount),
  breakdown: formData.breakdown,
}).unwrap();

    console.log(response);

    window.location.href = response.authorization_url;

  } catch (err) {
    console.error(err);

    alert(
      err?.data?.message ||
      "Unable to initialize payment."
    );
  }
};

  return (
    <main
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        padding: "50px 20px",
        fontFamily: "Candara",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            background: "#0B3D91",
            color: "#fff",
            borderRadius: "16px",
            padding: "35px",
            marginBottom: "35px",
            boxShadow: "0 15px 40px rgba(0,0,0,.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "12px",
            }}
          >
            <ShieldCheck size={42} color="#FFD700" />

            <h1
              style={{
                margin: 0,
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              Secure School Fee Payment
            </h1>
          </div>

          <p
            style={{
              margin: 0,
              lineHeight: 1.8,
              color: "#E5E7EB",
            }}
          >
            Complete the form below to securely pay school fees,
            PTA levies, uniforms, books, pocket money or any
            other approved payments using our secure payment
            gateway.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "35px",
            boxShadow: "0 10px 35px rgba(0,0,0,.08)",
          }}
        >

         {/* ===================== PAYER INFORMATION ===================== */}

<div
  style={{
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "25px",
    marginBottom: "30px",
  }}
>
  <h2
    style={{
      color: "#0B3D91",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <User size={24} />
    Payer Information
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "20px",
    }}
  >
    {/* Full Name */}

    <div>
      <label style={labelStyle}>
        <User size={16} />
        Full Name *
      </label>

      <input
        type="text"
        name="payerName"
        value={formData.payerName}
        onChange={handleChange}
        style={getInputStyle(errors.payerName)}
        placeholder="Enter Full Name"
      />

      {errors.payerName && (
        <small style={errorStyle}>
          {errors.payerName}
        </small>
      )}
    </div>

    {/* Email */}

    <div>
      <label style={labelStyle}>
        <Mail size={16} />
        Email Address *
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={getInputStyle(errors.email)}
        placeholder="example@gmail.com"
      />

      {errors.email && (
        <small style={errorStyle}>
          {errors.email}
        </small>
      )}
    </div>

    {/* Phone */}

    <div>
      <label style={labelStyle}>
        <Phone size={16} />
        Phone Number *
      </label>

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        style={getInputStyle(errors.phone)}
        placeholder="+234..."
      />

      {errors.phone && (
        <small style={errorStyle}>
          {errors.phone}
        </small>
      )}
    </div>
  </div>
</div>

{/* ===================== STUDENT INFORMATION ===================== */}

<div
  style={{
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "25px",
    marginBottom: "30px",
  }}
>
  <h2
    style={{
      color: "#0B3D91",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <GraduationCap size={24} />
    Student Information
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "20px",
    }}
  >
    {/* Student Name */}

    <div>
      <label style={labelStyle}>
        <GraduationCap size={16} />
        Student Name *
      </label>

      <input
        type="text"
        name="studentName"
        value={formData.studentName}
        onChange={handleChange}
        style={getInputStyle(errors.studentName)}
        placeholder="Student Full Name"
      />

      {errors.studentName && (
        <small style={errorStyle}>
          {errors.studentName}
        </small>
      )}
    </div>

    {/* Admission Number */}

    <div>
      <label style={labelStyle}>
        <FileText size={16} />
        Admission Number
      </label>

      <input
        type="text"
        name="admissionNumber"
        value={formData.admissionNumber}
        onChange={handleChange}
        style={getInputStyle()}
        placeholder="Optional"
      />
    </div>

    {/* Class */}

    <div>
      <label style={labelStyle}>
        <School size={16} />
        Student Class *
      </label>

      <select
        name="studentClass"
        value={formData.studentClass}
        onChange={handleChange}
        style={getInputStyle(errors.studentClass)}
      >
        <option value="">Select Class</option>

        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {errors.studentClass && (
        <small style={errorStyle}>
          {errors.studentClass}
        </small>
      )}
    </div>
  </div>
</div>

        {/* ===================== PAYMENT INFORMATION ===================== */}

<div
  style={{
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "25px",
    marginBottom: "30px",
  }}
>
  <h2
    style={{
      color: "#0B3D91",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <Wallet size={24} />
    Payment Information
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "20px",
    }}
  >
    <div>
      <label style={labelStyle}>
        <CreditCard size={16} />
        Payment Category *
      </label>

      <select
        name="paymentCategory"
        value={formData.paymentCategory}
        onChange={handleChange}
        style={getInputStyle(errors.paymentCategory)}
      >
        <option value="">Select Category</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {errors.paymentCategory && (
        <small style={errorStyle}>
          {errors.paymentCategory}
        </small>
      )}
    </div>

    <div>
      <label style={labelStyle}>
        <Wallet size={16} />
        Amount (₦) *
      </label>

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="200000"
        style={getInputStyle(errors.amount)}
      />

      {errors.amount && (
        <small style={errorStyle}>
          {errors.amount}
        </small>
      )}
    </div>
  </div>
</div>

{/* ===================== BREAKDOWN ===================== */}

<div style={{ marginBottom: "30px" }}>
  <label style={labelStyle}>
    <FileText size={16} />
    Payment Breakdown *
  </label>

  <textarea
    rows={6}
    name="breakdown"
    value={formData.breakdown}
    onChange={handleChange}
    placeholder="Example:

School Fees - ₦200,000
Uniform - ₦20,000
Pocket Money - ₦15,000"
    style={{
      ...getInputStyle(errors.breakdown),
      resize: "vertical",
      minHeight: "160px",
    }}
  />

  {errors.breakdown && (
    <small style={errorStyle}>
      {errors.breakdown}
    </small>
  )}
</div>

{/* ===================== PAYMENT SUMMARY ===================== */}

<div
  style={{
    background: "#F8FAFC",
    border: "2px solid #FFD700",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "35px",
  }}
>
  <h2
    style={{
      color: "#0B3D91",
      marginTop: 0,
      marginBottom: "18px",
    }}
  >
    Payment Summary
  </h2>

  <div style={{ lineHeight: 2 }}>
    <p><strong>Payer:</strong> {formData.payerName || "--"}</p>

    <p><strong>Student:</strong> {formData.studentName || "--"}</p>

    <p><strong>Class:</strong> {formData.studentClass || "--"}</p>

    <p><strong>Category:</strong> {formData.paymentCategory || "--"}</p>

    <p
      style={{
        fontSize: "1.3rem",
        fontWeight: 700,
        color: "#8B0000",
      }}
    >
      Total:
      {" "}
      {formData.amount
        ? `₦${Number(formData.amount).toLocaleString()}`
        : "₦0"}
    </p>
  </div>
 
 {/* ===================== BUTTON ===================== */}

<button
  type="submit"
  disabled={isLoading}
  onMouseEnter={() => setIsHover(true)}
  onMouseLeave={() => setIsHover(false)}
  style={{
    width: "100%",
    backgroundColor: isHover ? "#FFD700" : "#0B3D91",
    color: isHover ? "#0B3D91" : "#FFD700",
    padding: "18px",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "17px",
    cursor: isLoading ? "not-allowed" : "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    opacity: isLoading ? 0.7 : 1,
  }}
>
  <ShieldCheck size={22} />

  {isLoading
    ? "Initializing Payment..."
    : "PROCEED TO SECURE PAYMENT"}

  <ArrowRight size={20} />
</button>

</div>
        </form>

      </div>
    </main>
  );
}