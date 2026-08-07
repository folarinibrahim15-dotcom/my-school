import React from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaCheckCircle, FaCheck } from "react-icons/fa";
import { useState } from "react";
import PayFeesBanner from "../components/acceptAdmission/PayFeesBanner"


export default function PaySchoolFees() {
  const [isBtnHover, setIsBtnHover] = useState(false);
  const navigate = useNavigate();
  // BUTTON VICE VERSA HOVER
  const btnBg = isBtnHover ? "#FFD700" : "#8B0000";
  const btnColor = isBtnHover ? "#8B0000" : "#FFD700";

  const fees = [
    { title: "School Fees & PTA Levies" },
    { title: "Optional fees", desc: "(e.g., uniform, textbooks, exercise books, etc)" },
    { title: "Pocket money", desc: "(custom amount for your child's allowance)" },
    { title: "Miscellaneous payments", desc: "(e.g., int'l exams, special events, etc)" },
  ];

  const steps = [
    { bold: "1. Enter", text: "your name and contact details." },
    { bold: "2. Enter", text: "the total amount" },
    { bold: "3. Enter the", text: "full name and class of the child you are paying for" },
    { bold: "4. Under 'Breakdown', ", text: 'clearly describe what the payment is for (e.g., “3rd Term Fees – ₦200,000, Pocket Money – ₦15,000, Uniform – ₦20,000”).' },
    { bold: "5. Using Bank Card, Transfer, or USSD", text: "Complete the payment on the Paystack checkout page and receipt will be emailed to you." },
  ];

  return (
    <main style={{ fontFamily: "candara", backgroundColor: "#FFFFFF" }}>
       <PayFeesBanner />
      {/* 2. MAIN CONTENT - 2 COLUMNS */}
      <div
        style={{
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 550,
                fontFamily:"candara",
                lineHeight: 1.3,
                letterSpacing: "1px",
                color: "#353535",
                margin: "0 0 2rem 0",
              }}
            >
              We've made it easy and secure to pay for your child's education, anytime, from anywhere.
            </h2>

            {/* FEES LIST */}
            {fees.map((item, index) => (
              <div key={index}>
                <div style={{ display: "flex", gap: "10px", padding: "0.8rem 0", alignItems: "center" }}>
                  <FaCheckCircle style={{ color: "#1E3A8A", fontSize: "16px", flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: "15px", color: "#000" }}>
                    <span style={{ fontWeight: 700 }}>{item.title}</span> {item.desc}
                  </p>
                </div>
                {index !== fees.length - 1 && <hr style={{ border: "none", borderTop: "1px solid #E5E5E5", margin: 0 }} />}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* TITLE WITH CHECK */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", alignItems: "center" }}>
              <FaCheck style={{ color: "#8B0000", fontSize: "16px" }} />
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 400, color: "#000" }}>
                What to Do on the Paystack Payment Page:
              </h3>
            </div>

            {/* STEPS */}
            <ol style={{ paddingLeft: "20px", margin: 0, lineHeight: 1.8 }}>
              {steps.map((step, index) => (
                <li key={index} style={{ marginBottom: "0.8rem", fontSize: "15px", color: "#000" }}>
                  <span style={{ fontWeight: 700 }}>{step.bold}</span> {step.text}
                </li>
              ))}
            </ol>

            <hr style={{ border: "none", borderTop: "1px solid #E5E5E5", margin: "1.5rem 0" }} />

            {/* BUTTON */}
            <button
              onClick={() => navigate("/secure-payment")}
              onMouseEnter={() => setIsBtnHover(true)}
              onMouseLeave={() => setIsBtnHover(false)}
              style={{
                width: "100%",
                backgroundColor: btnBg,
                color: btnColor,
                fontWeight: 700,
                padding: "14px",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
              }}
            >
              <FaThumbsUp /> PROCEED TO SECURE PAYMENT
            </button>
          </div>
        </div>
      </div>

      {/* 3. BLUE FOOTER QUOTE */}
      <div
        style={{
          backgroundColor: "#002A8F",
          padding: "4rem 1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 400,
            maxWidth: "700px",
            margin: "0 auto 2rem auto",
            lineHeight: 1.5,
          }}
        >
          "The upbringing of children is the true human art."
        </p>
        <div 
          style={{
            height: "3px",
            backgroundColor: "#FFD700",
            maxWidth: "700px",
            margin: "0 auto"
          }}
        />
      </div>
    </main>
  );
}