import React from "react";
import LoginForm from "./LoginForm";
import logoo from "../../../../assets/images/logoo.png" // <-- add .png here

export default function LoginCard() {
 return (
    <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        padding: '2rem',
        margin: '2rem auto',
        boxSizing: 'border-box'
    }}>

      <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
      }}>

        <img
          src={logoo} // <-- changed from "/logoo.png"
          alt="School Logo"
          style={{
              width: '96px',
              height: 'auto',
              maxWidth: '100%',
              margin: '0 auto 1rem auto',
              display: 'block'
          }}
        />

        <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e40af',
            lineHeight: '1.4',
            margin: '0 0 0.5rem 0',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          Sound Peace International Schools
        </h1>

        <p style={{
            color: '#6b7280',
            marginTop: '0.5rem',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: '0.5rem 0 0 0',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          School ERP Portal
        </p>

      </div>

      <LoginForm />

    </div>
  );
}