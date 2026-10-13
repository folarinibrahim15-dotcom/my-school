import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { exportToPDF } from "../../../../../utils/reportExport";
import { useGetPaymentsQuery } from "../../../../../redux/api/paymentApi";
import { useGetDashboardStatsQuery } from "../../../../../redux/api/dashboardApi";
import { HiOutlineEye, HiOutlineArrowDownTray } from "react-icons/hi2";

export default function ReportsTable({ payments: propPayments = [] }) {
  const navigate = useNavigate();
  const { data: paymentsApiData, isLoading } = useGetPaymentsQuery({ limit: 2000 });
  const { data: statsData } = useGetDashboardStatsQuery();

  const dashboard = useMemo(() => {
    const f = statsData?.data || statsData || {};
    return {...f,...(f.data || {}),...(f.stats || {}) };
  }, [statsData]);

  const payments = useMemo(() => {
    let all = [...(propPayments || [])];
    const apiList = paymentsApiData?.payments || paymentsApiData?.data || paymentsApiData?.results || paymentsApiData || [];
    if (Array.isArray(apiList)) all = [...all,...apiList];
    if (dashboard.payments) all = [...all,...dashboard.payments];
    const deduped = Array.from(new Map(all.filter(Boolean).map(p => [p._id, p])).values());
    return deduped;
  }, [propPayments, paymentsApiData, dashboard]);

  const handleDownload = (p) => {
    const rows = [
      ["Reference", p.paymentReference || p._id],
      ["Student", getStudent(p)],
      ["Payment Category", getCategory(p)],
      ["Method", getMethod(p)],
      ["Amount", `₦${Number(p.amount || 0).toLocaleString()}`],
      ["Status", p.status],
      ["Date", getDate(p)],
    ];
    exportToPDF(`Payment-${p.paymentReference || p._id}`, ["Field", "Value"], rows);
  };

  const getCategory = (p) => {
    let cat = p.paymentPurpose || p.paymentCategory || p.paymentType || p.feeType || p.category || p.type || p.purpose;
    if (cat && String(cat).trim() &&!["general", "not specified", "general fee"].includes(String(cat).toLowerCase())) {
      return String(cat).trim();
    }
    if (p.metadata?.paymentCategory) return p.metadata.paymentCategory;
    return "School Fees";
  };
  const getStudent = (p) => p.student?.firstName? `${p.student.firstName} ${p.student.lastName || ""}`.trim() : p.studentName || p.payerName || "Unknown";
  const getMethod = (p) => p.paymentMethod || "Paystack";
  const getDate = (p) => { const d = p.paidAt || p.paymentDate || p.createdAt; return d? new Date(d).toLocaleDateString() : "N/A"; };
  const getSession = (p) => p.academicSession || "2025/2026";
  const getTerm = (p) => p.term || "First Term";

  const badgeColor = (cat) => {
    const c = cat.toLowerCase();
    if (c.includes("admission")) return { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A" };
    if (c.includes("school")) return { bg: "#DBEAFE", color: "#1E40AF", border: "#BFDBFE" };
    if (c.includes("uniform")) return { bg: "#FCE7F3", color: "#9D174D", border: "#FBCFE8" };
    if (c.includes("exam")) return { bg: "#E0E7FF", color: "#4338CA", border: "#C7D2FE" };
    if (c.includes("transport") || c.includes("bus")) return { bg: "#DCFCE7", color: "#166534", border: "#BBF7D0" };
    return { bg: "#F1F5F9", color: "#334155", border: "#E2E8F0" };
  };

  const statusBadge = (status) => {
    const base = {
      padding: "5px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: "700",
      display: "inline-flex", alignItems:"center", letterSpacing:"0.02em", border:"1px solid"
    };
    if (["Successful", "Paid", "Completed"].includes(status)) return {...base, backgroundColor: "#DCFCE7", color: "#15803D", borderColor:"#BBF7D0" };
    if (status === "Pending") return {...base, backgroundColor: "#FEF9C3", color: "#A16207", borderColor:"#FDE68A" };
    return {...base, backgroundColor: "#FEE2E2", color: "#B91C1C", borderColor:"#FECACA" };
  };

  return (
    <>
      <style>{`
       .reports-card{background:#fff; border-radius:16px; border:1px solid #E5E7EB; overflow:hidden; box-shadow:0 4px 18px rgba(15,23,42,.06); margin:16px;}
       .table-wrap{overflow-x:auto; width:100%; -webkit-overflow-scrolling:touch;}
       .table-wrap table{width:100%; border-collapse:collapse; min-width:1000px;}
       .cat-badge{padding:6px 12px; border-radius:9999px; font-size:11px; font-weight:700; display:inline-flex; align-items:center; border:1px solid; letter-spacing:.02em;}

       .action-btn{width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; border:1px solid; transition:all.2s ease; -webkit-tap-highlight-color:transparent; touch-action:manipulation;}
       .action-btn:active{transform:scale(.92);}
       .btn-view{background:#EFF6FF; border-color:#DBEAFE; color:#2563EB;}
       .btn-view:hover,.btn-view:active{background:#DBEAFE; border-color:#93C5FD;}
       .btn-down{background:#F0FDF4; border-color:#DCFCE7; color:#16A34A;}
       .btn-down:hover,.btn-down:active{background:#DCFCE7; border-color:#86EFAC;}

        /* MOBILE - COMPRESSED LEFT EDGE */
       .mobile-cards{display:none;}
        @media(max-width:767px){
         .reports-card{margin:0 0 0 12px; width:320px; max-width:92vw; border-radius:12px;}
         .table-wrap{display:none!important;}
         .mobile-cards{display:flex!important; flex-direction:column; gap:10px; padding:10px; align-items:flex-start;}
         .mobile-card{width:100%; border:1px solid #E5E7EB; border-radius:10px; padding:12px; background:#fff; box-sizing:border-box;}
         .cat-badge{padding:4px 9px; font-size:10px;}
        }
      `}</style>

      <div className="reports-card">
        <div style={{ padding: "16px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", margin: 0, color: "#0F172A" }}>Payment Reports</h2>
          <span style={{ fontSize: "11px", color: "#64748B", background: "#F8FAFC", padding: "4px 10px", borderRadius: "9999px", border:"1px solid #E2E8F0" }}>{payments.length} records</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr style={{ background: "#F8FAFC" }}>{["Ref", "Student", "Payment Category", "Method", "Amount", "Status", "Date", "Session", "Term", "Actions"].map(h => (<th key={h} style={{ padding: "12px", textAlign: h === "Actions"? "center" : "left", fontSize: "12px", fontWeight:700, color: "#334155" }}>{h}</th>))}</tr></thead>
            <tbody>
              {isLoading &&!payments.length? <tr><td colSpan={10} style={{ padding: "40px", textAlign: "center" }}>Loading...</td></tr> :
             !payments.length? <tr><td colSpan={10} style={{ padding: "40px", textAlign: "center" }}>No payments</td></tr> :
              payments.map(p => {
                const cat = getCategory(p); const cs = badgeColor(cat);
                return (
                  <tr key={p._id} style={{ borderTop: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "12px", fontSize: "12px" }}>{p.paymentReference?.slice(-8) || p._id?.slice(-8)}</td>
                    <td style={{ padding: "12px", fontWeight: "600", fontSize:"12px" }}>{getStudent(p)}</td>
                    <td style={{ padding: "12px" }}><span className="cat-badge" style={{ background: cs.bg, color: cs.color, borderColor: cs.border }}>{cat}</span></td>
                    <td style={{ padding: "12px", fontSize:"12px" }}>{getMethod(p)}</td>
                    <td style={{ padding: "12px", fontWeight: "700", fontSize:"12px" }}>₦{Number(p.amount || 0).toLocaleString()}</td>
                    <td style={{ padding: "12px" }}><span style={statusBadge(p.status)}>{p.status}</span></td>
                    <td style={{ padding: "12px", fontSize:"12px" }}>{getDate(p)}</td>
                    <td style={{ padding: "12px", fontSize:"12px" }}>{getSession(p)}</td>
                    <td style={{ padding: "12px", fontSize:"12px" }}>{getTerm(p)}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <button onClick={() => navigate(`/portal/reports/${p._id}`)} className="action-btn btn-view" title="View"><HiOutlineEye size={16} /></button>
                        <button onClick={() => handleDownload(p)} className="action-btn btn-down" title="Download"><HiOutlineArrowDownTray size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mobile-cards">
          {payments.map(p => {
            const cat = getCategory(p); const cs = badgeColor(cat);
            return (
              <div key={p._id} className="mobile-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems:"flex-start" }}>
                  <div style={{ minWidth:0, flex:1 }}>
                    <p style={{ margin: 0, fontWeight: "700", fontSize:"13px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{getStudent(p)}</p>
                    <p style={{ margin: "2px 0 0 0", fontSize: "10px", color: "#64748B" }}>{p.paymentReference?.slice(0,12)} • {getDate(p)}</p>
                  </div>
                  <span style={statusBadge(p.status)}>{p.status}</span>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                  <span className="cat-badge" style={{ background: cs.bg, color: cs.color, borderColor: cs.border }}>{cat}</span>
                  <span style={{ fontSize: "10px", background: "#F8FAFC", padding: "4px 8px", borderRadius: "9999px", border:"1px solid #E2E8F0" }}>{getMethod(p)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontWeight: "800", fontSize: "14px" }}>₦{Number(p.amount || 0).toLocaleString()}</p>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => navigate(`/portal/reports/${p._id}`)} className="action-btn btn-view"><HiOutlineEye size={15} /></button>
                    <button onClick={() => handleDownload(p)} className="action-btn btn-down"><HiOutlineArrowDownTray size={15} /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}