import React, { useState } from "react";
import { FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactBanner from "../components/acceptAdmission/ContactBanner"; // fixed: Component name should be PascalCase

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   alert("Message sent! We will get back to you soon.");
  //   setFormData({ name: "", email: "", subject: "", message: "" });
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message.");
    }

    alert("Message sent successfully! Please check your email.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  const inputStyle = {
    width: "100%",
    padding: "12px 0",
    border: "none",
    borderBottom: "1px solid #CCCCCC",
    backgroundColor: "transparent",
    fontSize: "15px",
    outline: "none",
    fontFamily: "candara",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontSize: "18px",
    color: "#000000",
    marginBottom: "4px",
    display: "block",
    fontWeight: 400,
    fontFamily: "candara",
  };

  return (
    <section style={{ backgroundColor: "#F5F5F5", fontFamily: "candara" }}>
      
      {/* 1. REPLACED YELLOW HEADER WITH BANNER */}
      <ContactBanner />

      {/* 2. MAIN CONTENT - 2 COLUMNS */}
      <div
        style={{
          padding: "4rem 1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: CONTACT DETAILS */}
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#000",
                margin: "0 0 1rem 0",
                paddingBottom: "8px",
                borderBottom: "3px solid #FFD700",
                display: "inline-block",
              }}
            >
              Contact Details
            </h3>

            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              
              {/* Address */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <FaHome style={{ color: "#000", fontSize: "18px", marginTop: "18px" }} />
                <p style={{ margin: 0, fontSize: "20px", color: "#444", lineHeight: 1.7 }}>
                  5, Sound Peace Crescent Opposite
                  <br />
                  Abc Garden Abalabi Road
                  <br />
                  Sojuolu Ewekoro Ogun State
                </p>
              </div>

              {/* Phones */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <FaPhone style={{ color: "#000", fontSize: "16px" }} />
                  <p style={{ margin: 0, fontSize: "24px", color: "#333", fontWeight: 500 }}>
                    <a
                      href="tel:+2348038555951"
                        style={{
                           textDecoration: "underline",
                            }}
                        >
                         +2348038555951
                  </a>
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <FaPhone style={{ color: "#000", fontSize: "16px" }} />
                  <p style={{ margin: 0, fontSize: "24px", color: "#333", fontWeight: 500 }}>
                    <a
                      href="tel:+2348062265559"
                        style={{
                           textDecoration: "underline",
                            }}
                        >
                         +2348062265559
                  </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <FaEnvelope style={{ color: "#8B0000", fontSize: "16px" }} />
                <a
                  href="mailto:soundpeaceinternationalschools@gmail.com"
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#8B0000",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  soundpeaceinternationalschools@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#000",
                margin: "0 0 1rem 0",
                paddingBottom: "8px",
                borderBottom: "3px solid #FFD700",
                display: "inline-block",
              }}
            >
              Contact us, we are here to help
            </h3>

            <form onSubmit={handleSubmit} style={{ marginTop: "2rem", fontSize:'20px', display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Name */}
              <div>
                <label style={labelStyle}>Your Name (required)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Your Email (required)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Subject */}
              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    border: "1px solid #CCCCCC",
                    padding: "12px",
                    borderRadius: "4px",
                  }}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  padding: "14px 40px",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1E3A8A";
                  e.currentTarget.style.color = "#FFD700";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFD700";
                  e.currentTarget.style.color = "#000";
                }}
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}