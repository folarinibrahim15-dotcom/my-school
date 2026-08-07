// ============================================================
// src/components/testimonials/TestimonialCard.jsx
// ------------------------------------------------------------
// Premium Responsive Testimonial Card
//
// Features
// • Fully Responsive
// • Professional Layout
// • Equal Height Cards
// • Modern Hover Animation
// • Mobile Friendly
// • Prevents Card Breaking
// • Smooth Typography Scaling
// ============================================================

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function TestimonialCard({ testimonial }) {
  return (
    <>
      <style>{`

      .testimonial-card{

        position:relative;

        width:100%;
        max-width:420px;
        min-width:280px;

        min-height:500px;

        background:#FFFFFF;

        border-radius:24px;

        overflow:hidden;

        padding:clamp(1.4rem,3vw,2.5rem);

        box-sizing:border-box;

        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;

        text-align:center;

        margin-inline:auto;

        box-shadow:0 10px 30px rgba(0,0,0,.08);

        transition:
        transform .45s ease,
        box-shadow .45s ease;

      }

      .testimonial-card:hover{

        transform:translateY(-8px);

        box-shadow:0 20px 45px rgba(0,0,0,.12);

      }

      .quote-icon{

        position:absolute;

        top:24px;
        right:24px;

        font-size:clamp(55px,7vw,80px);

        color:#DBEAFE;

        opacity:.55;

        pointer-events:none;

      }

      .testimonial-image{

        width:clamp(82px,15vw,112px);

        height:clamp(82px,15vw,112px);

        border-radius:50%;

        object-fit:cover;

        border:4px solid #FFFFFF;

        box-shadow:0 8px 18px rgba(0,0,0,.12);

      }

      .testimonial-name{

        margin-top:1.4rem;

        font-family:Poppins,sans-serif;

        font-weight:700;

        font-size:clamp(1.15rem,2.8vw,1.5rem);

        color:#111827;

        line-height:1.3;

        word-break:break-word;

      }

      .testimonial-role{

        margin-top:.9rem;

        background:var(--badge-color);

        color:#fff;

        padding:.55rem 1.15rem;

        border-radius:999px;

        font-weight:600;

        font-size:clamp(.75rem,2vw,.9rem);

        letter-spacing:.3px;

        max-width:100%;

        word-break:break-word;

      }

      .stars{

        display:flex;

        gap:4px;

        margin-top:1.2rem;

      }

      .testimonial-message{

        margin-top:1.5rem;

        font-family:"Open Sans",sans-serif;

        font-size:clamp(.92rem,2vw,1rem);

        line-height:1.85;

        color:#4B5563;

        flex:1;

        word-break:break-word;

        overflow-wrap:anywhere;

      }

      @media(max-width:768px){

        .testimonial-card{

          max-width:100%;

          min-width:unset;

          min-height:460px;

          border-radius:20px;

        }

      }

      @media(max-width:480px){

        .testimonial-card{

          padding:1.4rem;

          min-height:430px;

        }

      }

      `}</style>

      <div
        className="testimonial-card"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 20px 45px rgba(0,0,0,.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";
        }}
      >
        {/* Quote Icon */}

        <FaQuoteLeft className="quote-icon" />

        {/* Profile Image */}

        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="testimonial-image"
        />

        {/* Name */}

        <h3 className="testimonial-name">
          {testimonial.name}
        </h3>

        {/* Role */}

        <span
          className="testimonial-role"
          style={{
            "--badge-color": testimonial.badgeColor,
          }}
        >
          {testimonial.role}
        </span>

        {/* Rating */}

        <div className="stars">
          {[...Array(testimonial.rating)].map((_, index) => (
            <FaStar
              key={index}
              style={{
                color: "#FACC15",
                fontSize: "clamp(14px,2vw,18px)",
              }}
            />
          ))}
        </div>

        {/* Message */}

        <p className="testimonial-message">
          {testimonial.message}
        </p>
      </div>
    </>
  );
}
