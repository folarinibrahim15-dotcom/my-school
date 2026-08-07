import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useForgotPasswordMutation } from "../../../../redux/api/authApi";


export default function ForgotPassword(){


    const [email,setEmail] = useState("");

    const [message,setMessage] = useState("");

    const [error,setError] = useState("");



    const [
        forgotPassword,
        {isLoading}
    ] = useForgotPasswordMutation();





    const handleSubmit = async(e)=>{


        e.preventDefault();


        setMessage("");

        setError("");



        try{


            const response = await forgotPassword({

                email

            }).unwrap();



            setMessage(

                response.message ||

                "Password reset link sent successfully."

            );



        }catch(err){


            setError(

                err?.data?.message ||

                "Something went wrong."

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
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                padding: '2rem',
                boxSizing: 'border-box'
            }}>

                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#1e40af',
                    margin: '0 0 1rem 0',
                    lineHeight: '1.4'
                }}>
                    Forgot Password
                </h1>

                <p style={{
                    color: '#6b7280',
                    textAlign: 'center',
                    margin: '0 0 1.5rem 0',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}>
                    Enter your email and we will send you a reset link.
                </p>

                {message && (
                        <div style={{
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        }}>
                            {message}
                        </div>
                    )
                }

                {error && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        }}>
                            {error}
                        </div>
                    )
                }

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    }}
                >

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            outline: 'none',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            transition: 'border 0.2s ease, box-shadow 0.2s ease',
                            backgroundColor: '#ffffff'
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
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1.25rem'
                }}>
                    <Link
                        to="/portal/login"
                        style={{
                            color: '#1d4ed8',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '0.95rem'
                        }}
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );

}