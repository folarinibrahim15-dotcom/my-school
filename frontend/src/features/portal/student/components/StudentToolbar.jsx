import React, { useState, useEffect } from "react";
import { HiMagnifyingGlass, HiPlus, HiXMark } from "react-icons/hi2";

export default function StudentToolbar({
  onAddStudent,
  search,
  setSearch,
  studentClass,
  setStudentClass,
  gender,
  setGender,
  status,
  setStatus,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ULTRA COMPACT BOXES
  const box = {
    height: "30px",
    border: "1px solid #CBD5E1",
    borderRadius: "6px",
    padding: "0 6px",
    fontSize: "11px",
    outline: "none",
    background: "#fff",
    flex: "1 1 0",
    minWidth: "0",
    maxWidth: "85px",
  };

  return (
    <>
      <style>{`
        .st-wrap{background:#fff; border:1px solid #E5E7EB; border-radius:10px; padding:6px 8px; width:100%; box-sizing:border-box; overflow:hidden;}
        .st-head{margin-bottom:5px;}
        .st-head h1{margin:0; font-size:14px; font-weight:800; line-height:1;}
        .st-row{display:flex; gap:4px; align-items:center; width:100%; flex-wrap:nowrap; overflow:hidden;}
        .st-icon{width:30px; height:30px; border:1px solid #CBD5E1; border-radius:6px; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0;}
        .st-popup{position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:9999; display:flex; align-items:flex-start; justify-content:center; padding-top:70px;}
        .st-popup-box{background:#fff; width:90%; max-width:360px; border-radius:10px; padding:10px; display:flex; gap:6px;}
        .st-popup-box input{flex:1; height:40px; border:1px solid #CBD5E1; border-radius:8px; padding:0 12px; font-size:14px; outline:none;}
        @media(min-width:768px){
          .st-wrap{padding:12px;}
          .st-head h1{font-size:18px;}
          .st-row{gap:6px;}
        }
      `}</style>

      <div className="st-wrap">
        <div className="st-head">
          <h1>Students</h1>
        </div>

        <div className="st-row">
          {/* SEARCH ICON ONLY - MOBILE */}
          {isMobile ? (
            <button className="st-icon" onClick={() => setShowSearch(true)}>
              <HiMagnifyingGlass size={14} />
            </button>
          ) : (
            <div style={{ position: "relative", flex: "1", minWidth: 0, maxWidth: "160px" }}>
              <HiMagnifyingGlass style={{ position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: "11px" }} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...box, paddingLeft: "20px", maxWidth: "160px", width: "100%" }}
              />
            </div>
          )}

          <select value={studentClass} onChange={(e) => setStudentClass(e.target.value)} style={box}>
            <option value="">Class</option>
            <option>P1</option>
            <option>P2</option>
            <option>P3</option>
            <option>P4</option>
            <option>P5</option>
            <option>P6</option>
            <option>JSS1</option>
            <option>JSS2</option>
            <option>JSS3</option>
            <option>SS1</option>
            <option>SS2</option>
            <option>SS3</option>
          </select>

          <select value={gender} onChange={(e) => setGender(e.target.value)} style={box}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...box, maxWidth: "75px" }}>
            <option value="">Status</option>
            <option>Pending</option>
            <option>Admitted</option>
            <option>Rejected</option>
          </select>

          {/* ONLY ADD BUTTON - NO EXPORT */}
          <button
            onClick={onAddStudent}
            style={{
              height: "30px",
              padding: "0 8px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
              background: "#1E40AF",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <HiPlus size={12} /> Add
          </button>
        </div>
      </div>

      {/* SEARCH POPUP FOR MOBILE */}
      {showSearch && (
        <div className="st-popup" onClick={() => setShowSearch(false)}>
          <div className="st-popup-box" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              type="text"
              placeholder="Search name or admission no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setShowSearch(false)} className="st-icon" style={{ width: "40px", height: "40px" }}>
              <HiXMark size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}