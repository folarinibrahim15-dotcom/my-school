import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useLoginMutation } from "../../../../redux/api/authApi";
import { setCredentials } from "../../../../features/auth/authSlice";

export default function LoginForm() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================================
  // HOOKS
  // ==========================================================

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading }] =
    useLoginMutation();

  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      // Save authenticated user

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );

      // Redirect according to role

      //  navigate("/portal/dashboard");

      switch (response.user.role) {
        case "admin":
          navigate("/portal/dashboard");
          break;

        case "teacher":
          navigate("/portal/teacher");
          break;

        case "student":
          navigate("/portal/student");
          break;

        case "parent":
          navigate("/portal/parent");
          break;

        default:
          navigate("/portal/login");
      }
    } catch (err) {
      setError(
        err?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <form
      onSubmit={handleSubmit}
      style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          width: '100%'
      }}
    >
      {/* Error */}

      {error && (
        <div style={{
            borderRadius: '8px',
            border: '1px solid #fecaca',
            backgroundColor: '#fef2f2',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#b91c1c',
            lineHeight: '1.5'
        }}>
          {error}
        </div>
      )}

      {/* Email */}

      <div>
        <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151',
            fontSize: '0.95rem'
        }}>
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1rem',
              outline: 'none',
              transition: 'border 0.2s ease, box-shadow 0.2s ease',
              fontSize: '1rem',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff'
          }}
        />
      </div>

      {/* Password */}

      <div>
        <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151',
            fontSize: '0.95rem'
        }}>
          Password
        </label>

        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                padding: '0.75rem 3rem 0.75rem 1rem',
                outline: 'none',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
                fontSize: '1rem',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff'
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Forgot Password */}

      <div style={{ textAlign: 'right' }}>
        <Link
          to="/portal/forgot-password"
          style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#1d4ed8',
              textDecoration: 'none'
          }}
        >
          Forgot Password?
        </Link>
      </div>

     {/* Login Button */}
<button
        type="submit"
        disabled={isLoading}
        style={{
            width: '100%',
            borderRadius: '8px',
            backgroundColor: isLoading ? '#93c5fd' : '#1d4ed8',
            padding: '0.75rem',
            fontWeight: '600',
            color: '#ffffff',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 10px rgba(29, 78, 216, 0.25)'
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#facc15'; // yellow-400
            e.currentTarget.style.color = '#000000'; // black
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(250, 204, 21, 0.35)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#1d4ed8'; // back to blue
            e.currentTarget.style.color = '#ffffff'; // back to white
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(29, 78, 216, 0.25)';
          }
        }}
      >
        {isLoading
          ? "Logging in..."
          : "Login"}
      </button>

      {/* Register */}

      <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
        <span style={{ color: '#4b5563' }}>
          Don't have an account?
        </span>

        <Link
          to="/portal/register"
          style={{
              marginLeft: '0.5rem',
              fontWeight: '600',
              color: '#1d4ed8',
              textDecoration: 'none'
          }}
        >
          Register
        </Link>
      </div>
    </form>
  );
}