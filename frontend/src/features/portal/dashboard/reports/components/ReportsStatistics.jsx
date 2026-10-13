import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentChartBar,
} from "react-icons/hi2";

export default function ReportsStatistics({ dashboard = {} }) {
  const cards = [
    {
      title: "Students",
      value: dashboard.totalStudents || 0,
      sub: "+12% vs last month",
      gradient: "linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)",
      shadow: "0 8px 20px rgba(37,99,235,.25)",
      icon: <HiOutlineAcademicCap size={22} />,
    },
    {
      title: "Teachers",
      value: dashboard.totalTeachers || 0,
      sub: "Active staff",
      gradient: "linear-gradient(135deg,#4F46E5 0%,#4338CA 100%)",
      shadow: "0 8px 20px rgba(79,70,229,.25)",
      icon: <HiOutlineBriefcase size={22} />,
    },
    {
      title: "Parents",
      value: dashboard.totalParents || 0,
      sub: "Registered",
      gradient: "linear-gradient(135deg,#16A34A 0%,#15803D 100%)",
      shadow: "0 8px 20px rgba(22,163,74,.25)",
      icon: <HiOutlineUserGroup size={22} />,
    },
    {
      title: "Admissions",
      value: dashboard.totalAdmissions || 0,
      sub: "This session",
      gradient: "linear-gradient(135deg,#EAB308 0%,#CA8A04 100%)",
      shadow: "0 8px 20px rgba(234,179,8,.25)",
      icon: <HiOutlineDocumentChartBar size={22} />,
    },
    {
      title: "Revenue",
      value: `₦${Number(dashboard.totalRevenue || 0).toLocaleString()}`,
      sub: "Total earnings",
      gradient: "linear-gradient(135deg,#9333EA 0%,#7E22CE 100%)",
      shadow: "0 8px 20px rgba(147,51,234,.28)",
      icon: <HiOutlineCurrencyDollar size={22} />,
      isRevenue: true,
    },
  ];

  return (
    <>
      <style>{`
        .stats-grid{display:grid; grid-template-columns:1fr; gap:10px; width:100%; box-sizing:border-box;}
        .stats-card{position:relative; background:#fff; border-radius:14px; border:1px solid #E5E7EB; padding:14px; display:flex; align-items:center; justify-content:space-between; overflow:hidden; box-shadow:0 2px 10px rgba(15,23,42,.05); transition:all .25s ease; box-sizing:border-box;}
        .stats-card:hover{transform:translateY(-3px); box-shadow:0 10px 28px rgba(15,23,42,.08);}
        .stats-left{flex:1; min-width:0; padding-right:12px;}
        .stats-label{margin:0; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#64748B;}
        .stats-value{margin:6px 0 4px 0; font-size:22px; font-weight:800; color:#0F172A; line-height:1.1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
        .stats-value.revenue{font-size:16px; letter-spacing:-.02em;}
        .stats-sub{margin:0; font-size:11px; color:#94A3B8; font-weight:500;}
        .stats-icon{width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0;}
        .stats-glow{position:absolute; right:-20px; top:-20px; width:80px; height:80px; border-radius:50%; opacity:.08;}

        /* MOBILE - COMPRESSED LEFT EDGE */
        @media(max-width:767px){
          .stats-grid{width:320px; max-width:92vw; margin-left:12px;}
          .stats-card{padding:12px;}
          .stats-value{font-size:18px;}
          .stats-value.revenue{font-size:14px;}
          .stats-icon{width:36px; height:36px;}
        }
        @media(min-width:768px){
          .stats-grid{grid-template-columns:repeat(2,1fr); gap:16px;}
          .stats-card{border-radius:18px; padding:20px;}
          .stats-value{font-size:24px;}
          .stats-value.revenue{font-size:20px;}
          .stats-icon{width:48px; height:48px; border-radius:12px;}
        }
        @media(min-width:1280px){
          .stats-grid{grid-template-columns:repeat(5,1fr);}
        }
      `}</style>

      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.title} className="stats-card">
            <div className="stats-glow" style={{ background: c.gradient }} />

            <div className="stats-left">
              <p className="stats-label">{c.title}</p>
              <h2 className={`stats-value ${c.isRevenue ? "revenue" : ""}`} title={String(c.value)}>
                {c.value}
              </h2>
              <p className="stats-sub">{c.sub}</p>
            </div>

            <div className="stats-icon" style={{ background: c.gradient, boxShadow: c.shadow }}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}