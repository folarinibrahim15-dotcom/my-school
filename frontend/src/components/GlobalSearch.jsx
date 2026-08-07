import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { FiSearch, FiX, FiClock, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import searchData from "../data/searchData";

export default function GlobalSearch() {
  const navigate = useNavigate();
  const { isSearchOpen, closeSearch } = useSearch();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredResult, setHoveredResult] = useState(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const keyword = query.toLowerCase();
    return searchData.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(keyword);
      const descriptionMatch = (item.description || "").toLowerCase().includes(keyword);
      const keywordMatch = item.keywords.some((word) => word.toLowerCase().includes(keyword));
      return titleMatch || descriptionMatch || keywordMatch;
    });
  }, [query]);

  const handleNavigate = (item) => {
    const updatedRecent = [item,...recentSearches.filter((search) => search.title!== item.title)].slice(0, 5);
    setRecentSearches(updatedRecent);
    navigate(item.path, { state: { section: item.section } });
    setQuery("");
    setSelectedIndex(-1);
    closeSearch();
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = setTimeout(() => { inputRef.current?.focus(); }, 100);
    return () => clearTimeout(timer);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current &&!modalRef.current.contains(e.target)) { closeSearch(); }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => { document.removeEventListener("mousedown", handleOutsideClick); };
  }, [closeSearch]);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape") { closeSearch(); } };
    window.addEventListener("keydown", handleEscape);
    return () => { window.removeEventListener("keydown", handleEscape); };
  }, [closeSearch]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e) => {
      if (!results.length) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((prev) => prev < results.length - 1? prev + 1 : 0); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((prev) => prev > 0? prev - 1 : results.length - 1); }
      if (e.key === "Enter" && selectedIndex >= 0) { handleNavigate(results[selectedIndex]); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown); };
  }, [isSearchOpen, results, selectedIndex]);

  if (!isSearchOpen) return null;

  const overlay = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "clamp(60px, 10vh, 80px)",
    paddingLeft: "clamp(16px, 4vw, 24px)",
    paddingRight: "clamp(16px, 4vw, 24px)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const modal = {
    width: "100%",
    maxWidth: "896px", // max-w-4xl
    backgroundColor: "#ffffff",
    borderRadius: "1.5rem", // rounded-2xl
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    overflow: "hidden",
    animation: "fadeIn.25s ease"
  };

  const header = {
    padding: "clamp(20px, 4vw, 1.5rem)"
  };

  const searchBar = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    borderRadius: "1.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    padding: "clamp(14px, 3vw, 1rem) clamp(20px, 4vw, 1.5rem)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease"
  };

  const input = {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
    fontWeight: 400,
    color: "#1f2937",
    outline: "none",
    border: "none",
    marginLeft: "0.5rem",
    width: "100%"
  };

  const closeBtnBase = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.75rem",
    height: "2.75rem",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    flexShrink: 0,
    cursor: "pointer",
    color: "#374151"
  };

  const body = {
    maxHeight: "520px",
    overflowY: "auto"
  };

  const sectionPadding = {
    padding: "clamp(20px, 4vw, 1.5rem)"
  };

  const sectionTitle = {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1rem"
  };

  const recentBtn = (isHover) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    backgroundColor: isHover? "#f9fafb" : "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
    fontSize: "1rem",
    color: "#374151"
  });

  const resultBtn = (isSelected, isHover) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "clamp(16px, 3vw, 1.25rem) clamp(20px, 4vw, 1.5rem)",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: isSelected? "#fefce8" : isHover? "#fefce8" : "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
    marginLeft: "clamp(16px, 3vw, 1.75rem)",
    marginRight: "clamp(16px, 3vw, 1.75rem)"
  });

  const resultTitle = {
    fontWeight: 600,
    color: "#111827",
    fontSize: "1rem"
  };

  const resultDesc = {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
    lineHeight: 1.6
  };

  const noResults = {
    padding: "clamp(40px, 8vw, 2.5rem)",
    textAlign: "center",
    color: "#6b7280"
  };

  const footer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem clamp(20px, 4vw, 1.5rem)",
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #f3f4f6",
    fontSize: "0.875rem",
    color: "#6b7280",
    flexWrap: "wrap",
    gap: "0.5rem"
  };

  return (
    <div style={overlay}>
      <div ref={modalRef} style={modal}>
        {/* ================= HEADER ================= */}
        <div style={header}>
          <div style={searchBar}>
            <FiSearch size={24} color="#9ca3af" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages, news, admissions, facilities..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
              style={input}
            />
            <button
              onClick={closeSearch}
              onMouseEnter={() => setHoveredBtn("close")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
               ...closeBtnBase,
                backgroundColor: hoveredBtn === "close"? "#fef2f2" : "#ffffff",
                borderColor: hoveredBtn === "close"? "#fecaca" : "#e5e7eb",
                color: hoveredBtn === "close"? "#dc2626" : "#374151"
              }}
            >
              <FiX size={22} />
            </button>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div style={body}>
          {/* Recent Searches */}
          {!query && (
            <div style={sectionPadding}>
              <h3 style={sectionTitle}>Recent Searches</h3>
              {recentSearches.length === 0? (
                <p style={{ color: "#9ca3af" }}>Start typing to search...</p>
              ) : (
                recentSearches.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => handleNavigate(item)}
                    onMouseEnter={() => setHoveredBtn(`recent-${i}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={recentBtn(hoveredBtn === `recent-${i}`)}
                  >
                    <FiClock size={18} color="#6b7280" />
                    <span>{item.title}</span>
                  </button>
                ))
              )}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div style={noResults}>No results found.</div>
          )}

          {/* Search Results */}
          {results.map((item, index) => (
            <button
              key={item.title}
              onClick={() => handleNavigate(item)}
              onMouseEnter={() => setHoveredResult(index)}
              onMouseLeave={() => setHoveredResult(null)}
              style={resultBtn(selectedIndex === index, hoveredResult === index)}
            >
              <div style={{ textAlign: "left", flex: 1 }}>
                <h3 style={resultTitle}>{item.title}</h3>
                <p style={resultDesc}>{item.description}</p>
              </div>
              <FiArrowRight size={20} color="#9ca3af" style={{ flexShrink: 0 }} />
            </button>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div style={footer}>
          <span>↑ ↓ Navigate</span>
          <span>Enter to Open</span>
          <span>ESC to Close</span>
        </div>
      </div>
    </div>
  );
}