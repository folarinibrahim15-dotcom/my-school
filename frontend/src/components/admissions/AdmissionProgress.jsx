import React from "react";

export default function AdmissionProgress({
  progress = 25,
}) {
  return (
    // OUTER: padding top, bottom, left, right so it's not near screen
    <div style={{ width: '100%', paddingTop: '2rem', paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem', marginBottom: '2.5rem' }}>

      {/* Progress Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Online Application for Admission
        </h2>

        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#0B3D91',
            backgroundColor: 'rgba(11, 61, 145, 0.1)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px'
          }}
        >
          {progress}%
        </span>

      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '0.75rem',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
        }}
      >

        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50 0%, #2E7D32 100%)',
            borderRadius: '9999px',
            transition: 'all 0.7s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '0.5rem',
            width: `${progress}%`
          }}
        >

          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#fff',
              display: 'none'
            }}
          >
            {progress}%
          </span>

        </div>

      </div>

      {/* Step Text - ADDED TOP PADDING HERE */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1rem', // TOP PADDING ABOVE Child Details, Parent etc
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#6b7280'
        }}
      >

        <span style={progress >= 25 ? activeStepStyle : stepStyle}>
          Child Details
        </span>

        <span style={progress >= 50 ? activeStepStyle : stepStyle}>
          Parent Details
        </span>

        <span style={progress >= 75 ? activeStepStyle : stepStyle}>
          Documents
        </span>

        <span style={progress >= 100 ? activeStepStyle : stepStyle}>
          Payment
        </span>

      </div>

    </div>
  );
}

// Reusable inline styles
const stepStyle = {
  color: '#9ca3af',
  transition: 'color 0.3s'
}
const activeStepStyle = {
  color: '#0B3D91',
  fontWeight: 700,
  transition: 'color 0.3s'
}

// Show % on desktop
if (typeof window !== 'undefined' && window.innerWidth >= 640) {
  // we can't do media query in inline, so keep it hidden. Tailwind was handling this
}