import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";
  import { useState, useEffect } from "react";

export default function StudentStatistics({ students = [] }) {
  const totalStudents = students.length;

  const maleStudents = students.filter(
    (student) => student.gender === "Male"
  ).length;

  const femaleStudents = students.filter(
    (student) => student.gender === "Female"
  ).length;

  const activeStudents = students.filter(
    (student) =>
      student.status === "Active" ||
      student.status === "Admitted"
  ).length;

  const graduatedStudents = students.filter(
    (student) => student.status === "Graduated"
  ).length;

  const newAdmissions = students.filter(
    (student) =>
      student.status === "New" ||
      student.status === "Pending"
  ).length;


const cards = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: HiOutlineAcademicCap,
      bg: "#EFF6FF",
      iconBg: "#2563EB",
    },
    {
      title: "Male Students",
      value: maleStudents,
      icon: HiOutlineUser,
      bg: "#F0F9FF",
      iconBg: "#0284C7",
    },
    {
      title: "Female Students",
      value: femaleStudents,
      icon: HiOutlineUserGroup,
      bg: "#FDF2F8",
      iconBg: "#DB2777",
    },
    {
      title: "Active",
      value: activeStudents,
      icon: HiOutlineCheckCircle,
      bg: "#F0FDF4",
      iconBg: "#16A34A",
    },
    {
      title: "Graduated",
      value: graduatedStudents,
      icon: HiOutlineClock,
      bg: "#FFF7ED",
      iconBg: "#EA580C",
    },
    {
      title: "New Admissions",
      value: newAdmissions,
      icon: HiOutlineSparkles,
      bg: "#FAF5FF",
      iconBg: "#9333EA",
    },
  ];

  const [cols, setCols] = useState("1fr"); // default mobile

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols("repeat(3, 1fr)"); // xl: 3 columns
      else if (w >= 768) setCols("repeat(2, 1fr)"); // md: 2 columns  
      else setCols("1fr"); // mobile: 1 column vertical
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols, // responsive columns
        gap: "20px",
        width: "100%",
        boxSizing: "border-box",
        padding: "clamp(12px,3vw,24px)",
        overflowX: "hidden",
      }}
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(15,23,42,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(15,23,42,.06)";
            }}
            style={{
              background: card.bg,
              border: "1px solid #E5E7EB",
              borderRadius: "18px",
              padding: "clamp(16px,3vw,24px)",
              boxSizing: "border-box",
              transition: "all .25s ease",
              boxShadow:
                "0 4px 14px rgba(15,23,42,.06)",
              cursor: "pointer",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexDirection: window.innerWidth < 400 ? "column" : "row", // extra small phones stack icon under text
                textAlign: window.innerWidth < 400 ? "center" : "left"
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#64748B",
                    fontSize: "clamp(13px,2vw,15px)",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                  }}
                >
                  {card.title}
                </p>

                <h2
                  style={{
                    margin: "10px 0 0",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "clamp(28px,5vw,38px)",
                    lineHeight: 1.1,
                  }}
                >
                  {card.value.toLocaleString()}
                </h2>
              </div>

              <div
                style={{
                  width: "clamp(52px,10vw,64px)",
                  height: "clamp(52px,10vw,64px)",
                  borderRadius: "18px",
                  background: card.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,.12)",
                }}
              >
                <Icon
                  style={{
                    color: "#fff",
                    fontSize: "clamp(22px,4vw,30px)",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}