// ==========================================================
// src/components/acceptAdmission/AcceptBanner.jsx
// ----------------------------------------------------------
// Premium Accept Admission Banner
//
// Features:
// - Fully Responsive
// - Fade-in animation
// - Reusable component
// - Backend-ready content
// ==========================================================
import React from 'react'

export default function AcceptBanner() {
  return (
    <section
      className="w-full animate-[fadeIn_.8s_ease-in-out]"
      style={{
        backgroundColor: "#FFD700",
      }}
    >
      <div style={{
  width: '100%',
  backgroundColor: '#FFD700',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '60px',
  paddingRight: '60px'
}}>
  
  <p style={{
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'candara',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '1.8',
    letterSpacing: '-0.6px'
  }}>
          Keep up to date with stories, news and reports about our
          <br />
          Sound Peace International Secondary School.
  </p>

</div>


      {/* Local animation (no external CSS required) */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}