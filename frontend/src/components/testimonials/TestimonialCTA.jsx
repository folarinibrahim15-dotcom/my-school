import React from "react";

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

export default function TestimonialCTA() {

  return (

    <section
      className="
      relative
      overflow-hidden
      py-24
      px-6
      "
      style={{
        background:
          "linear-gradient(135deg, #0B3D91 0%, #1E40AF 100%)"
      }}
    >

      {/* Background Decoration */}

      <div
        className="
        absolute
        -top-20
        -right-20
        w-72
        h-72
        rounded-full
        bg-white/10
        "
      ></div>

      <div
        className="
        absolute
        -bottom-24
        -left-24
        w-96
        h-96
        rounded-full
        bg-yellow-400/10
        "
      ></div>

                <div
            style={{
                position: 'relative',
                maxWidth: '72rem', // max-w-6xl
                margin: '0 auto',  // mx-auto
                textAlign: 'center',
                color: '#FFFFFF' // text-white
            }}
            >

            <span
                style={{
                display: 'inline-block',
                backgroundColor: '#FACC15', // bg-yellow-400
                color: '#000', // text-black
                fontWeight: 600,
                paddingTop: '0.75rem',    // increased top padding
                paddingBottom: '0.75rem', // increased bottom padding  
                paddingLeft: '1.5rem',    // increased left padding
                paddingRight: '1.5rem',   // increased right padding
                borderRadius: '9999px', // rounded-full
                marginBottom: '2rem'      // increased bottom space below the yellow box
                }}
            >
                Join Our Community
            </span>

        <h2
          className="
          text-4xl
          md:text-5xl
          font-extrabold
          leading-tight
          font-poppins
          "
        >

          Begin Your Child's Journey

          <br />

          Towards Excellence Today

        </h2>

            <p
            style={{
                maxWidth: '48rem',
                margin: '2rem auto 0 auto',
                fontSize: '1.125rem',
                lineHeight: '2rem',
                color: '#DBEAFE',
                textAlign: 'center',
            }}
            >
            Become part of a school where academic excellence,
            character development, innovation, and leadership
            are nurtured every single day.
            <br />
            Schedule a visit, contact our admissions office,
            or begin your application online.
            </p>

            {/* Buttons - Same line on mobile + desktop */}
            <div
            style={{
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'row', // Always row
                flexWrap: 'wrap', // Wrap on small screens instead of stacking
                justifyContent: 'center',
                gap: '1.25rem',
                paddingLeft: '1rem',
                paddingRight: '1rem'
            }}
            >

            <Link
                to="/admissions/ApplyOnline"
                style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                backgroundColor: '#FACC15',
                color: '#000',
                fontWeight: 700,
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                transition: 'all 300ms',
                textDecoration: 'none',
                whiteSpace: 'nowrap' // prevents text from breaking
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Apply Now
                <FaArrowRight />
            </Link>

            <Link
                to="/contact"
                style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                borderRadius: '0.75rem',
                transition: 'all 300ms',
                textDecoration: 'none',
                whiteSpace: 'nowrap' // prevents text from breaking
                }}
                onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#0B3D91';
                }}
                onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
                }}
            >
                <FaPhoneAlt />
                Contact Us
            </Link>

            </div>

            {/* Contact Info */}
            <div
            style={{
                marginTop: '3.5rem',
                display: 'flex',
                flexDirection: 'row', // Always row
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                color: '#DBEAFE',
                paddingLeft: '1rem',
                paddingRight: '1rem'
            }}
            >
        </div>

      </div>

    </section>

  );

}