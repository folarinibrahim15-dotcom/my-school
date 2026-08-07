import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../../../redux/api/authApi";


export default function Register() {

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();


    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",

    });


    const [showPassword, setShowPassword] = useState(false);


    const [error, setError] = useState("");



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if(formData.password !== formData.confirmPassword){

            setError("Passwords do not match.");

            return;

        }



        try {


            await register({

                firstName: formData.firstName,

                lastName: formData.lastName,

                email: formData.email,

                phoneNumber: formData.phoneNumber,

                password: formData.password,

            }).unwrap();



            alert("Registration successful!");

            navigate("/portal/login");



        } catch(err){


            setError(

                err?.data?.message ||

                "Registration failed. Please try again."

            );


        }


    };





  return (
        <main style={{
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem 1rem',
            fontFamily: 'Candara, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            boxSizing: 'border-box'
        }}>

            <div style={{
                width: '100%',
                maxWidth: '28rem',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                boxSizing: 'border-box'
            }}>

                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#1e3a8a',
                    margin: '0 0 1.5rem 0',
                    lineHeight: '1.4'
                }}>
                    Create Account
                </h1>

                {error && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        }}>
                            {error}
                        </div>
                    )
                }

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem'
                    }}>

                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            style={{
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                padding: '0.625rem 0.75rem',
                                outline: 'none',
                                fontSize: '1rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                transition: 'border 0.2s ease, box-shadow 0.2s ease'
                            }}
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            style={{
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                padding: '0.625rem 0.75rem',
                                outline: 'none',
                                fontSize: '1rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                transition: 'border 0.2s ease, box-shadow 0.2s ease'
                            }}
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '0.625rem 0.75rem',
                            outline: 'none',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            transition: 'border 0.2s ease, box-shadow 0.2s ease'
                        }}
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '0.625rem 0.75rem',
                            outline: 'none',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            transition: 'border 0.2s ease, box-shadow 0.2s ease'
                        }}
                    />

                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                padding: '0.625rem 3rem 0.625rem 0.75rem',
                                outline: 'none',
                                fontSize: '1rem',
                                boxSizing: 'border-box',
                                transition: 'border 0.2s ease, box-shadow 0.2s ease'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '0.875rem',
                                color: '#1d4ed8',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '500',
                                padding: '0'
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '0.625rem 0.75rem',
                            outline: 'none',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            transition: 'border 0.2s ease, box-shadow 0.2s ease'
                        }}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            backgroundColor: isLoading ? '#93c5fd' : '#1d4ed8',
                            color: '#ffffff',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            border: 'none',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 10px rgba(29, 78, 216, 0.25)',
                            transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
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
                        {isLoading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    marginTop: '1.25rem',
                    color: '#4b5563',
                    lineHeight: '1.6'
                }}>
                    Already have an account?
                    <Link
                        to="/portal/login"
                        style={{
                            color: '#1d4ed8',
                            fontWeight: '600',
                            marginLeft: '0.25rem',
                            textDecoration: 'none'
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );

}