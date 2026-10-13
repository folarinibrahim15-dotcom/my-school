import React, { useState, useEffect } from "react";
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function StatusBadge({ value, type }) {
  let bg = "#F3F4F6", color = "#374151";
  if (type === "admission") {
    if (value === "Admitted") { bg = "#DCFCE7"; color = "#15803D"; }
    else if (value === "Rejected") { bg = "#FEE2E2"; color = "#B91C1C"; }
    else { bg = "#FEF9C3"; color = "#A16207"; }
  }
  if (type === "payment") {
    if (value === "Paid") { bg = "#DCFCE7"; color = "#15803D"; }
    else { bg = "#FEE2E2"; color = "#B91C1C"; }
  }
  return (
    <span style={{ display:"inline-flex", padding:"2px 8px", borderRadius:"9999px", backgroundColor:bg, color, fontSize:"10px", fontWeight:700, whiteSpace:"nowrap" }}>
      {value || "-"}
    </span>
  );
}

export default function StudentTable({ students = [], onEdit, onDelete }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) {
    return (
      <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"12px", overflow:"hidden", margin:"16px", boxShadow:"0 2px 10px rgba(0,0,0,.05)" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"900px" }}>
            <thead style={{ background:"#F8FAFC" }}>
              <tr>
                {["Student","Admission No.","Class","Gender","Session","Admission","Payment","Actions"].map(h => (
                  <th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:"12px", fontWeight:700, color:"#334155" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign:"center", padding:"40px", color:"#64748B" }}>No students found.</td></tr>
              ) : students.map(s => (
                <tr key={s._id} style={{ borderBottom:"1px solid #F1F5F9" }}>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <img src={s.passport || `https://ui-avatars.com/api/?name=${s.firstName}+${s.lastName}`} alt="" style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover" }} />
                      <div>
                        <p style={{ margin:0, fontWeight:600, fontSize:"13px", color:"#0F172A" }}>{s.firstName} {s.lastName}</p>
                        <p style={{ margin:0, fontSize:"11px", color:"#64748B" }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", fontSize:"12px" }}>{s.admissionNumber || "-"}</td>
                  <td style={{ padding:"12px 14px", fontSize:"12px" }}>{s.class || "-"}</td>
                  <td style={{ padding:"12px 14px", fontSize:"12px" }}>{s.gender || "-"}</td>
                  <td style={{ padding:"12px 14px", fontSize:"12px" }}>{s.session || "-"}</td>
                  <td style={{ padding:"12px 14px" }}><StatusBadge value={s.admissionStatus} type="admission" /></td>
                  <td style={{ padding:"12px 14px" }}><StatusBadge value={s.paymentStatus} type="payment" /></td>
                  <td style={{ padding:"12px 14px", textAlign:"center" }}>
                    <div style={{ display:"flex", justifyContent:"center", gap:"8px" }}>
                      <button onClick={() => navigate(`/portal/students/${s._id}`)} style={{ border:"none", background:"none", color:"#2563EB", cursor:"pointer" }}><HiOutlineEye size={18}/></button>
                      <button onClick={() => onEdit(s)} style={{ border:"none", background:"none", color:"#16A34A", cursor:"pointer" }}><HiOutlinePencilSquare size={18}/></button>
                      <button onClick={() => onDelete(s)} style={{ border:"none", background:"none", color:"#DC2626", cursor:"pointer" }}><HiOutlineTrash size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // MOBILE - COMPRESSED LEFT EDGE
  return (
    <>
      <style>{`
        .m-wrap{width:100%; box-sizing:border-box; padding:8px 0 8px 10px; display:flex; flex-direction:column; gap:8px; align-items:flex-start;}
        .m-card{width:310px; background:#fff; border:1px solid #E5E7EB; border-radius:10px; padding:14px; box-sizing:border-box; box-shadow:0 1px 4px rgba(0,0,0,.05);}
        .m-head{display:flex; align-items:center; gap:8px; margin-bottom:8px;}
        .m-head img{width:32px; height:32px; border-radius:50%; object-fit:cover; flex-shrink:0;}
        .m-name{margin:0; font-size:14px; font-weight:700; color:#0F172A; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px;}
        .m-email{margin:0; font-size:10px; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px;}
        .m-row{display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid #F8FAFC;}
        .m-label{font-size:10px; font-weight:600; color:#64748B;}
        .m-value{font-size:11px; font-weight:600; color:#0F172A; max-width:120px; text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
        .m-actions{display:flex; justify-content:flex-start; gap:12px; padding-top:8px; margin-top:4px; border-top:1px solid #E5E7EB;}
        .m-actions button{border:none; background:#F8FAFC; width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; cursor:pointer;}
      `}</style>

      <div className="m-wrap">
        {students.length === 0 ? (
          <div className="m-card" style={{ textAlign:"center", color:"#64748B", fontSize:"12px" }}>No students found.</div>
        ) : students.map(s => (
          <div key={s._id} className="m-card">
            <div className="m-head">
              <img src={s.passport || `https://ui-avatars.com/api/?name=${s.firstName}+${s.lastName}`} alt="" />
              <div style={{ minWidth:0 }}>
                <p className="m-name">{s.firstName} {s.lastName}</p>
                <p className="m-email">{s.email}</p>
              </div>
            </div>

            <div className="m-row"><span className="m-label">Adm No.</span><span className="m-value">{s.admissionNumber || "-"}</span></div>
            <div className="m-row"><span className="m-label">Class</span><span className="m-value">{s.class || s.currentClass || "-"}</span></div>
            <div className="m-row"><span className="m-label">Gender</span><span className="m-value">{s.gender || "-"}</span></div>
            <div className="m-row"><span className="m-label">Session</span><span className="m-value">{s.session || "-"}</span></div>
            <div className="m-row"><span className="m-label">Admission</span><StatusBadge value={s.admissionStatus} type="admission" /></div>
            <div className="m-row" style={{ borderBottom:"none" }}><span className="m-label">Payment</span><StatusBadge value={s.paymentStatus} type="payment" /></div>

            <div className="m-actions">
              <button onClick={() => navigate(`/portal/students/${s._id}`)} style={{ color:"#2563EB" }}><HiOutlineEye size={14}/></button>
              <button onClick={() => onEdit(s)} style={{ color:"#16A34A" }}><HiOutlinePencilSquare size={14}/></button>
              <button onClick={() => onDelete(s)} style={{ color:"#DC2626" }}><HiOutlineTrash size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}