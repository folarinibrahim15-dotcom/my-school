// ============================================================
// src/components/testimonials/TestimonialCard.jsx
// ------------------------------------------------------------
// Premium Responsive Testimonial Card
//
// Features
// • Fully Responsive
// • Mobile-first design
// • One-column mobile presentation
// • Multi-column desktop presentation
// • Prevents text compression
// • Prevents letter-by-letter breaking
// • Flexible content height
// • Premium hover animation
// • Long-content safe
// • iPhone optimized
// ============================================================

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function TestimonialCard({ testimonial }) {
    return (
        <>
            <style>{`
                /* =========================================================
                   MAIN CARD
                ========================================================= */

                .testimonial-card {
                    position: relative;

                    width: 100%;
                    max-width: 420px;

                    margin: 0 auto;

                    background: #FFFFFF;

                    border-radius: 24px;

                    padding: clamp(
                        1.5rem,
                        3vw,
                        2.5rem
                    );

                    box-sizing: border-box;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    text-align: center;

                    box-shadow:
                        0 10px 30px rgba(0, 0, 0, 0.08);

                    transition:
                        transform 0.4s ease,
                        box-shadow 0.4s ease;

                    overflow: hidden;

                    /* Important for grid layouts */
                    min-width: 0;
                }


                /* =========================================================
                   HOVER
                ========================================================= */

                .testimonial-card:hover {
                    transform: translateY(-8px);

                    box-shadow:
                        0 20px 45px rgba(0, 0, 0, 0.12);
                }


                /* =========================================================
                   QUOTE ICON
                ========================================================= */

                .quote-icon {
                    position: absolute;

                    top: 22px;
                    right: 22px;

                    font-size: clamp(
                        48px,
                        7vw,
                        78px
                    );

                    color: #DBEAFE;

                    opacity: 0.55;

                    pointer-events: none;

                    z-index: 0;
                }


                /* =========================================================
                   PROFILE IMAGE
                ========================================================= */

                .testimonial-image {
                    position: relative;

                    z-index: 2;

                    width: clamp(
                        82px,
                        14vw,
                        112px
                    );

                    height: clamp(
                        82px,
                        14vw,
                        112px
                    );

                    min-width: 82px;
                    min-height: 82px;

                    border-radius: 50%;

                    object-fit: cover;

                    border: 4px solid #FFFFFF;

                    box-shadow:
                        0 8px 18px rgba(0, 0, 0, 0.12);

                    flex-shrink: 0;
                }


                /* =========================================================
                   NAME
                ========================================================= */

                .testimonial-name {
                    position: relative;

                    z-index: 2;

                    width: 100%;

                    margin: 1.35rem 0 0;

                    font-family:
                        Poppins,
                        Arial,
                        sans-serif;

                    font-weight: 700;

                    font-size: clamp(
                        1.15rem,
                        2.5vw,
                        1.5rem
                    );

                    line-height: 1.3;

                    color: #111827;

                    /*
                     * IMPORTANT:
                     * Do NOT break words into individual letters.
                     */
                    word-break: normal;

                    overflow-wrap: break-word;

                    white-space: normal;
                }


                /* =========================================================
                   ROLE BADGE
                ========================================================= */

                .testimonial-role {
                    position: relative;

                    z-index: 2;

                    display: inline-flex;

                    align-items: center;
                    justify-content: center;

                    width: fit-content;

                    max-width: 100%;

                    margin-top: 0.9rem;

                    padding:
                        0.65rem
                        1.25rem;

                    background: var(--badge-color);

                    color: #FFFFFF;

                    border-radius: 999px;

                    font-family:
                        Poppins,
                        Arial,
                        sans-serif;

                    font-weight: 600;

                    font-size: clamp(
                        0.78rem,
                        2vw,
                        0.92rem
                    );

                    line-height: 1.3;

                    letter-spacing: 0.3px;

                    text-align: center;

                    /*
                     * Keep complete words together.
                     */
                    word-break: normal;

                    overflow-wrap: break-word;

                    white-space: normal;
                }


                /* =========================================================
                   STARS
                ========================================================= */

                .stars {
                    position: relative;

                    z-index: 2;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 5px;

                    margin-top: 1.25rem;

                    flex-wrap: nowrap;
                }


                /* =========================================================
                   MESSAGE
                ========================================================= */

                .testimonial-message {
                    position: relative;

                    z-index: 2;

                    width: 100%;

                    margin: 1.5rem 0 0;

                    font-family:
                        "Open Sans",
                        Arial,
                        sans-serif;

                    font-size: clamp(
                        0.95rem,
                        2vw,
                        1.05rem
                    );

                    line-height: 1.85;

                    color: #4B5563;

                    text-align: center;

                    /*
                     * Allow normal wrapping.
                     * Never split every word into letters.
                     */
                    word-break: normal;

                    overflow-wrap: break-word;

                    white-space: normal;

                    hyphens: none;
                }


                /* =========================================================
                   TABLET
                ========================================================= */

                @media (max-width: 900px) {

                    .testimonial-card {
                        max-width: 390px;

                        padding: 1.6rem;
                    }

                }


                /* =========================================================
                   MOBILE
                ========================================================= */

                @media (max-width: 768px) {

                    .testimonial-card {

                        /*
                         * CRITICAL:
                         * If the parent uses CSS Grid with 3 columns,
                         * this makes the testimonial span the entire row.
                         */

                        width: 100%;

                        max-width: 100%;

                        min-width: 0;

                        margin-left: auto;
                        margin-right: auto;

                        padding:
                            1.6rem
                            1.25rem;

                        border-radius: 20px;

                        box-shadow:
                            0 8px 25px
                            rgba(0, 0, 0, 0.07);
                    }


                    .testimonial-image {

                        width: 96px;
                        height: 96px;

                        min-width: 96px;
                        min-height: 96px;
                    }


                    .testimonial-name {

                        font-size: 1.3rem;

                        line-height: 1.35;

                        margin-top: 1.2rem;
                    }


                    .testimonial-role {

                        font-size: 0.86rem;

                        padding:
                            0.6rem
                            1.15rem;

                        max-width: 90%;
                    }


                    .testimonial-message {

                        font-size: 1rem;

                        line-height: 1.8;

                        padding:
                            0 0.25rem;
                    }

                }


                /* =========================================================
                   SMALL PHONES
                ========================================================= */

                @media (max-width: 480px) {

                    .testimonial-card {

                        width: 100%;

                        padding:
                            1.5rem
                            1.1rem;

                        border-radius: 18px;
                    }


                    .quote-icon {

                        top: 16px;
                        right: 16px;

                        font-size: 50px;
                    }


                    .testimonial-image {

                        width: 88px;
                        height: 88px;

                        min-width: 88px;
                        min-height: 88px;

                        border-width: 3px;
                    }


                    .testimonial-name {

                        font-size: 1.25rem;

                        line-height: 1.35;
                    }


                    .testimonial-role {

                        font-size: 0.82rem;

                        padding:
                            0.58rem
                            1rem;
                    }


                    .stars {

                        gap: 4px;

                        margin-top: 1.1rem;
                    }


                    .testimonial-message {

                        font-size: 0.98rem;

                        line-height: 1.8;

                        margin-top: 1.3rem;
                    }

                }


                /* =========================================================
                   VERY SMALL PHONES
                ========================================================= */

                @media (max-width: 360px) {

                    .testimonial-card {

                        padding:
                            1.35rem
                            1rem;
                    }


                    .testimonial-image {

                        width: 82px;
                        height: 82px;

                        min-width: 82px;
                        min-height: 82px;
                    }


                    .testimonial-name {

                        font-size: 1.15rem;
                    }


                    .testimonial-message {

                        font-size: 0.95rem;

                        line-height: 1.75;
                    }

                }


                /* =========================================================
                   TOUCH DEVICES
                ========================================================= */

                @media (hover: none) {

                    .testimonial-card:hover {

                        transform: none;

                        box-shadow:
                            0 10px 30px
                            rgba(0, 0, 0, 0.08);
                    }

                }

            `}</style>

            <div
                className="testimonial-card"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(-8px)";

                    e.currentTarget.style.boxShadow =
                        "0 20px 45px rgba(0,0,0,.12)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(0)";

                    e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,.08)";
                }}
            >

                {/* =====================================================
                    QUOTE ICON
                ===================================================== */}

                <FaQuoteLeft className="quote-icon" />


                {/* =====================================================
                    PROFILE IMAGE
                ===================================================== */}

                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-image"
                />


                {/* =====================================================
                    NAME
                ===================================================== */}

                <h3 className="testimonial-name">
                    {testimonial.name}
                </h3>


                {/* =====================================================
                    ROLE
                ===================================================== */}

                <span
                    className="testimonial-role"
                    style={{
                        "--badge-color":
                            testimonial.badgeColor,
                    }}
                >
                    {testimonial.role}
                </span>


                {/* =====================================================
                    RATING
                ===================================================== */}

                <div
                    className="stars"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                >
                    {[...Array(testimonial.rating)].map(
                        (_, index) => (
                            <FaStar
                                key={index}
                                style={{
                                    color: "#FACC15",
                                    fontSize:
                                        "clamp(15px,2vw,18px)",
                                }}
                            />
                        )
                    )}
                </div>


                {/* =====================================================
                    MESSAGE
                ===================================================== */}

                <p className="testimonial-message">
                    {testimonial.message}
                </p>

            </div>
        </>
    );
}