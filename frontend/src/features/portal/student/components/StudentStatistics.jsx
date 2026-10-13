import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";

export default function StudentStatistics({ students = [] }) {
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === "Male").length;
  const femaleStudents = students.filter(s => s.gender === "Female").length;
  const activeStudents = students.filter(s => ["Active","Admitted"].includes(s.status)).length;
  const graduatedStudents = students.filter(s => s.status === "Graduated").length;
  const newAdmissions = students.filter(s => ["New","Pending"].includes(s.status)).length;

  const cards = [
    { title: "Total", value: totalStudents, icon: HiOutlineAcademicCap, bg: "#EFF6FF", iconBg: "#2563EB" },
    { title: "Male", value: maleStudents, icon: HiOutlineUser, bg: "#F0F9FF", iconBg: "#0284C7" },
    { title: "Female", value: femaleStudents, icon: HiOutlineUserGroup, bg: "#FDF2F8", iconBg: "#DB2777" },
    { title: "Active", value: activeStudents, icon: HiOutlineCheckCircle, bg: "#F0FDF4", iconBg: "#16A34A" },
    { title: "Graduated", value: graduatedStudents, icon: HiOutlineClock, bg: "#FFF7ED", iconBg: "#EA580C" },
    { title: "New", value: newAdmissions, icon: HiOutlineSparkles, bg: "#FAF5FF", iconBg: "#9333EA" },
  ];

  return (
    <>
      <style>{`
        .stats-grid{display:flex; flex-direction:column; align-items:flex-start; gap:6px; width:100%; padding-left:12px; padding-right:12px; padding-top:8px; padding-bottom:8px; box-sizing:border-box;}
        .stats-card{width:260px; height:36px; background:#fff; border:1px solid #E5E7EB; border-radius:8px; padding:0 10px; display:flex; align-items:center; justify-content:space-between; box-sizing:border-box;}
        .stats-left{display:flex; align-items:center; gap:6px;}
        .stats-title{margin:0; font-size:10px; font-weight:700; color:#475569;}
        .stats-value{margin:0; font-size:15px; font-weight:800; color:#0F172A;}
        .stats-icon{width:24px; height:26px; border-radius:5px; display:flex; align-items:center; justify-content:center; flex-shrink:0;}
        @media(min-width:768px){
          .stats-grid{display:grid; grid-template-columns:repeat(3,260px); gap:10px; padding:12px;}
          .stats-card{width:260px; height:62px; border-radius:10px;}
          .stats-title{font-size:11px;}
          .stats-value{font-size:18px;}
          .stats-icon{width:30px; height:34px;}
        }
      `}</style>

      <div className="stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="stats-card" style={{ background: card.bg }}>
              <div className="stats-left">
                <div className="stats-icon" style={{ background: card.iconBg }}>
                  <Icon style={{ color: "#fff", fontSize: "11px" }} />
                </div>
                <p className="stats-title">{card.title}</p>
              </div>
              <h2 className="stats-value">{card.value}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}