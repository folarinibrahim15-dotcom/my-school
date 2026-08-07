import React, { useState, useEffect } from "react";
import {
  HiMagnifyingGlass,
  HiArrowDownTray,
  HiPlus,
} from "react-icons/hi2";

/*
|--------------------------------------------------------------------------
| Responsive Search Input
|--------------------------------------------------------------------------
*/

function SearchInput({ search, setSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  const showInput = !isMobile || isOpen;

  if (!showInput) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px",
          border: "1px solid #CBD5E1",
          borderRadius: "12px",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        <HiMagnifyingGlass size={20} />
        Search
      </button>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <HiMagnifyingGlass
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#94A3B8",
          fontSize: "20px",
        }}
      />

      <input
        type="text"
        placeholder="Search by name or admission number..."
        value={search}
        autoFocus={isMobile}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => {
          if (isMobile && !search) {
            setIsOpen(false);
          }
        }}
        style={{
          width: "100%",
          padding: "12px 16px 12px 44px",
          borderRadius: "12px",
          border: "1px solid #CBD5E1",
          outline: "none",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Student Toolbar
|--------------------------------------------------------------------------
*/

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
  const selectStyle = {
    width: "100%",
    border: "1px solid #CBD5E1",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 18px rgba(15,23,42,.06)",
        padding: "24px",
        margin: "24px",
      }}
    >
      {/* Header */}

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Students
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748B",
          }}
        >
          Manage all students within the school.
        </p>
      </div>

      {/* Controls */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <SearchInput
          search={search}
          setSearch={setSearch}
        />

        <select
          value={studentClass}
          onChange={(e) =>
            setStudentClass(e.target.value)
          }
          style={selectStyle}
        >
          <option value="">All Classes</option>
          <option>Primary 1</option>
          <option>Primary 2</option>
          <option>Primary 3</option>
          <option>Primary 4</option>
          <option>Primary 5</option>
          <option>Primary 6</option>
          <option>JSS 1</option>
          <option>JSS 2</option>
          <option>JSS 3</option>
          <option>SS 1</option>
          <option>SS 2</option>
          <option>SS 3</option>
        </select>

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
          style={selectStyle}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={selectStyle}
        >
          <option value="">Admission Status</option>
          <option>Pending</option>
          <option>Admitted</option>
          <option>Rejected</option>
        </select>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #CBD5E1",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <HiArrowDownTray size={20} />
            Export
          </button>

          <button
            onClick={onAddStudent}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: "#1E40AF",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow:
                "0 4px 12px rgba(30,64,175,.25)",
            }}
          >
            <HiPlus size={20} />
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}