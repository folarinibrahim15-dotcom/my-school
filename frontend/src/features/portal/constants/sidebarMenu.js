// ======================================================
// Sound Peace International Schools ERP
// Sidebar Navigation Configuration
// ======================================================

import {
  HiOutlineHome,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export const sidebarMenu = [
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        path: "/portal/dashboard",
        icon: HiOutlineHome,
        roles: ["admin", "teacher", "parent", "student"],
      },
    ],
  },

  {
    section: "ACADEMICS",
    items: [
      {
        title: "Students",
        path: "/portal/students",
        icon: HiOutlineAcademicCap,
        roles: ["admin", "teacher"],
      },
      {
        title: "Teachers",
        path: "/portal/teachers",
        icon: HiOutlineUserGroup,
        roles: ["admin"],
      },
      {
        title: "Parents",
        path: "/portal/parents",
        icon: HiOutlineUsers,
        roles: ["admin"],
      },
      {
        title: "Admissions",
        path: "/portal/admissions",
        icon: HiOutlineClipboardDocumentList,
        roles: ["admin"],
      },
    ],
  },

  {
    section: "FINANCE",
    items: [
      {
        title: "Finance",
        path: "/portal/finance",
        icon: HiOutlineBanknotes,
        roles: ["admin", "accountant"],
      },
    ],
  },

  {
    section: "REPORTS",
    items: [
      {
        title: "Reports",
        path: "/portal/reports",
        icon: HiOutlineChartBar,
        roles: ["admin", "teacher"],
      },
    ],
  },

  {
    section: "SYSTEM",
    items: [
      {
        title: "Notifications",
        path: "/portal/notifications",
        icon: HiOutlineBell,
        roles: ["admin", "teacher", "parent", "student"],
      },
      {
        title: "Settings",
        path: "/portal/settings",
        icon: HiOutlineCog6Tooth,
        roles: ["admin"],
      },
    ],
  },
];