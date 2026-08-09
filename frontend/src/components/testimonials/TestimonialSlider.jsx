import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import testimonialsData from "../../data/testimonialsData";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialSlider() {
    const settings = {
        /*
        ============================================================
        MOBILE FIRST
        ============================================================
        */

        mobileFirst: true,

        dots: true,

        infinite: true,

        speed: 700,

        slidesToShow: 1,

        slidesToScroll: 1,

        autoplay: true,

        autoplaySpeed: 5000,

        pauseOnHover: true,

        arrows: false,

        adaptiveHeight: true,

        /*
        ============================================================
        TABLET + DESKTOP
        ============================================================
        */

        responsive: [
            {
                breakpoint: 768,

                settings: {
                    slidesToShow: 2,

                    slidesToScroll: 1,

                    arrows: false,

                    adaptiveHeight: true,
                },
            },

            {
                breakpoint: 1200,

                settings: {
                    slidesToShow: 3,

                    slidesToScroll: 1,

                    arrows: true,

                    adaptiveHeight: false,
                },
            },
        ],
    };

    return (
        <section
            style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",

                paddingTop: "5rem",
                paddingBottom: "5rem",

                paddingLeft:
                    "clamp(1rem, 4vw, 2.5rem)",

                paddingRight:
                    "clamp(1rem, 4vw, 2.5rem)",

                backgroundColor: "#F9FAFB",

                overflow: "hidden",
            }}
        >

            {/* =====================================================
                SECTION HEADER
            ===================================================== */}

            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",

                    margin:
                        "0 auto 3rem auto",

                    paddingLeft:
                        "clamp(0.5rem, 2vw, 1rem)",

                    paddingRight:
                        "clamp(0.5rem, 2vw, 1rem)",

                    boxSizing: "border-box",

                    textAlign: "center",
                }}
            >

                <h2
                    style={{
                        margin: 0,

                        fontFamily:
                            "Poppins, Arial, sans-serif",

                        fontSize:
                            "clamp(1.75rem, 5vw, 2.5rem)",

                        fontWeight: 700,

                        lineHeight: 1.2,

                        color: "#111827",

                        overflowWrap: "normal",

                        wordBreak: "normal",
                    }}
                >
                    What Our Community Says
                </h2>

                <p
                    style={{
                        width: "100%",

                        maxWidth: "760px",

                        margin:
                            "1.25rem auto 0 auto",

                        fontFamily:
                            '"Open Sans", Arial, sans-serif',

                        fontSize:
                            "clamp(0.95rem, 2.5vw, 1.125rem)",

                        lineHeight: 1.8,

                        color: "#6B7280",

                        textAlign: "center",

                        overflowWrap: "normal",

                        wordBreak: "normal",
                    }}
                >
                    Hear directly from parents, students,
                    teachers and alumni whose lives have
                    been positively impacted by
                    Sound Peace International Schools.
                </p>

            </div>


            {/* =====================================================
                SLIDER CONTAINER
            ===================================================== */}

            <div
                style={{
                    width: "100%",
                    maxWidth: "1400px",

                    margin: "0 auto",

                    boxSizing: "border-box",
                }}
            >

                <Slider {...settings}>

                    {testimonialsData.map(
                        (testimonial) => (
                            <div
                                key={testimonial.id}
                                style={{
                                    width: "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "0.75rem",

                                    outline: "none",
                                }}
                            >

                                <div
                                    style={{
                                        width: "100%",

                                        maxWidth:
                                            "430px",

                                        margin:
                                            "0 auto",

                                        boxSizing:
                                            "border-box",
                                    }}
                                >

                                    <TestimonialCard
                                        testimonial={
                                            testimonial
                                        }
                                    />

                                </div>

                            </div>
                        )
                    )}

                </Slider>

            </div>

        </section>
    );
}