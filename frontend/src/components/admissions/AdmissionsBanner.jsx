import React from "react";

export default function AdmissionsBanner() {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#FFD700',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: '1.875rem',
            fontWeight: 700,
            color: '#000',
            lineHeight: 1.2,
            margin: 0,
            paddingBottom: '1.25rem'
          }}
        >
          Apply for Admission, Today!
        </h1>

        {/* Subtitle - FIXED FONT */}
        <p
          style={{
            maxWidth: '60rem',
            margin: '0 auto',
            color: '#000',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // SAFE SYSTEM FONT
            fontWeight: 400,
            padding: '0 0.5rem'
          }}
        >
          Please ensure you have a clear passport photograph ready before
          completing your application. After submitting your application,
          you will be redirected to our secure Paystack payment gateway
          to pay the{" "}
          <strong style={{ fontWeight: 700 }}>₦15,000 Admission Form Fee.</strong>
          <br />
          Once payment is successful, a copy of your completed application
          together with your payment receipt will automatically be sent
          to your email address.
        </p>
      </div>
    </section>
  );
}