import React from "react";

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaAward,
    FaSchool
} from "react-icons/fa";

const stats = [
    {
        id: 1,

        icon: <FaUserGraduate size={45} />,

        number: "1,500+",

        title: "Students Enrolled",

        description:
            "Empowering learners with quality education every year.",

        color: "#2563EB"
    },

    {
        id: 2,

        icon: <FaAward size={45} />,

        number: "98%",

        title: "Graduation Success",

        description:
            "Consistent outstanding academic performance and examination success.",

        color: "#FACC15"
    },

    {
        id: 3,

        icon: <FaSchool size={45} />,

        number: "15+",

        title: "Years of Excellence",

        description:
            "Providing world-class education with integrity and innovation.",

        color: "#16A34A"
    },

    {
        id: 4,

        icon: <FaChalkboardTeacher size={45} />,

        number: "120+",

        title: "Qualified Teachers",

        description:
            "Experienced professionals dedicated to student success.",

        color: "#DC2626"
    }
];

export default function TestimonialStats() {
    return (
        <section
            style={{
                width: "100%",
                boxSizing: "border-box",
                paddingTop: "clamp(4rem, 8vw, 6rem)",
                paddingBottom: "clamp(4rem, 8vw, 6rem)",
                paddingLeft: "clamp(1rem, 4vw, 2rem)",
                paddingRight: "clamp(1rem, 4vw, 2rem)",
                backgroundColor: "#FFFFFF",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "80rem",
                    margin: "0 auto",
                    paddingLeft: "clamp(0.25rem, 2vw, 1.5rem)",
                    paddingRight: "clamp(0.25rem, 2vw, 1.5rem)",
                    boxSizing: "border-box"
                }}
            >

                {/* Heading */}

                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginBottom: "clamp(2.5rem, 6vw, 4rem)",
                        boxSizing: "border-box"
                    }}
                >

                    <h2
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                            fontWeight: 700,
                            fontFamily: "Poppins, sans-serif",
                            color: "#111827",
                            lineHeight: 1.25,
                            paddingTop: "0.75rem",
                            paddingBottom: "0.75rem",
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                            margin: 0,
                            textAlign: "center",
                            overflowWrap: "break-word"
                        }}
                    >
                        Our Impact In Numbers
                    </h2>

                    <p
                        style={{
                            width: "100%",
                            maxWidth: "48rem",
                            boxSizing: "border-box",
                            margin: "1.25rem auto 0 auto",
                            color: "#4B5563",
                            lineHeight: 1.8,
                            fontSize: "clamp(0.95rem, 2.5vw, 1.125rem)",
                            paddingTop: "0.75rem",
                            paddingBottom: "0.75rem",
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                            textAlign: "center",
                            overflowWrap: "break-word"
                        }}
                    >
                        Every achievement reflects our commitment to academic excellence,
                        leadership development, innovation, and the holistic growth of
                        every learner.
                    </p>

                </div>


                {/* Cards */}

                <div
                    style={{
                        width: "100%",
                        display: "grid",

                        /*
                         * Automatically changes the number of columns
                         * depending on available screen width.
                         *
                         * Desktop → 4 cards
                         * Tablet  → 2 or 3 cards
                         * Mobile  → 1 card
                         */
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",

                        gap: "clamp(1.25rem, 3vw, 2rem)",

                        alignItems: "stretch",

                        boxSizing: "border-box"
                    }}
                >

                    {
                        stats.map((item) => (

                            <div

                                key={item.id}

                                style={{
                                    width: "100%",
                                    minWidth: 0,
                                    boxSizing: "border-box",

                                    backgroundColor: "#FFFFFF",

                                    borderRadius: "1.5rem",

                                    boxShadow:
                                        "0 10px 30px rgba(15, 23, 42, 0.08)",

                                    padding:
                                        "clamp(1.5rem, 4vw, 2rem)",

                                    textAlign: "center",

                                    border:
                                        "1px solid #F3F4F6",

                                    display: "flex",

                                    flexDirection: "column",

                                    alignItems: "center",

                                    justifyContent: "flex-start",

                                    minHeight: "100%",

                                    overflow: "hidden",

                                    transition:
                                        "transform 0.35s ease, box-shadow 0.35s ease"
                                }}

                            >

                                <div

                                    style={{
                                        width: "100%",

                                        display: "flex",

                                        justifyContent: "center",

                                        alignItems: "center",

                                        marginBottom: "1.5rem",

                                        color: item.color,

                                        flexShrink: 0
                                    }}

                                >

                                    {item.icon}

                                </div>


                                <h3

                                    style={{
                                        width: "100%",

                                        margin: "0 0 0.75rem",

                                        fontSize:
                                            "clamp(2.5rem, 7vw, 3rem)",

                                        fontWeight: 800,

                                        lineHeight: 1.1,

                                        color: item.color,

                                        fontFamily:
                                            "Poppins, sans-serif",

                                        overflowWrap: "break-word",

                                        wordBreak: "normal"
                                    }}

                                >

                                    {item.number}

                                </h3>


                                <h4

                                    style={{
                                        width: "100%",

                                        margin: "0 0 1rem",

                                        fontSize:
                                            "clamp(1.05rem, 3vw, 1.25rem)",

                                        fontWeight: 700,

                                        lineHeight: 1.4,

                                        color: "#111827",

                                        fontFamily:
                                            "Poppins, sans-serif",

                                        overflowWrap: "break-word",

                                        wordBreak: "normal"
                                    }}

                                >

                                    {item.title}

                                </h4>


                                <p

                                    style={{
                                        width: "100%",

                                        margin: 0,

                                        color: "#4B5563",

                                        lineHeight: 1.75,

                                        fontSize:
                                            "clamp(0.92rem, 2.5vw, 1rem)",

                                        fontFamily:
                                            '"Open Sans", Arial, sans-serif',

                                        overflowWrap: "break-word",

                                        wordBreak: "normal",

                                        whiteSpace: "normal"
                                    }}

                                >

                                    {item.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>
    );
}