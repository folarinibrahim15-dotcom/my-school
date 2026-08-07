import React from "react";
import { Outlet } from "react-router-dom";

import ParentSidebar from "../components/ParentSidebar";    
import ParentNavbar from "../components/ParentNavbar";

export default function ParentLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100 font-[Candara]">

      {/* Sidebar */}
      <ParentSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <ParentNavbar />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}