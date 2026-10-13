import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function StudentPagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show only 3 pages on mobile to avoid overflow
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return [1,2,3,4,totalPages];
    if (currentPage >= totalPages - 2) return [1,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,currentPage-1,currentPage,currentPage+1,totalPages];
  };

  return (
    <>
      <style>{`
        .pg-wrap{width:310px; max-width:92vw; background:#fff; border:1px solid #E5E7EB; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,.05); padding:10px 12px; box-sizing:border-box; margin:0 0 0 12px;}
        .pg-header{text-align:left; color:#64748B; font-size:11px; font-weight:600; margin-bottom:10px;}
        .pg-row{display:flex; align-items:center; gap:6px; flex-wrap:wrap; justify-content:flex-start;}
        .pg-btn{width:32px; height:32px; border-radius:8px; border:1px solid #CBD5E1; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:12px; font-weight:600; flex-shrink:0; transition:.2s;}
        .pg-btn.active{background:#1E40AF; color:#fff; border:none; box-shadow:0 3px 8px rgba(30,64,175,.2);}
        .pg-btn:disabled{opacity:.4; cursor:not-allowed;}
        @media(min-width:768px){
          .pg-wrap{width:auto; max-width:100%; margin:16px; padding:16px; border-radius:16px;}
          .pg-header{text-align:center; font-size:13px;}
          .pg-row{justify-content:center; gap:8px;}
          .pg-btn{width:38px; height:38px; border-radius:10px; font-size:14px;}
        }
      `}</style>

      <div className="pg-wrap">
        <div className="pg-header">
          Page <strong style={{color:"#0F172A"}}>{currentPage}</strong> of <strong style={{color:"#0F172A"}}>{totalPages}</strong>
        </div>

        <div className="pg-row">
          <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="pg-btn">
            <HiChevronLeft size={14} />
          </button>

          {getVisiblePages().map((page, idx, arr) => {
            const prev = arr[idx - 1];
            const showDots = prev && page - prev > 1;
            return (
              <React.Fragment key={page}>
                {showDots && <span style={{ fontSize:"11px", color:"#94A3B8", padding:"0 2px" }}>...</span>}
                <button onClick={() => onPageChange(page)} className={`pg-btn ${page === currentPage ? 'active' : ''}`}>
                  {page}
                </button>
              </React.Fragment>
            );
          })}

          <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="pg-btn">
            <HiChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}