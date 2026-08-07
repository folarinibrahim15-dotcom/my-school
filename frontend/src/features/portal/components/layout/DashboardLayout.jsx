import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {

    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <div className="min-h-screen bg-slate-100">

            {/* ===========================
                Mobile Sidebar
            ============================ */}

            <MobileSidebar

                open={mobileOpen}

                onClose={() => setMobileOpen(false)}

            />

            <div className="flex">

                {/* ===========================
                    Desktop Sidebar
                ============================ */}

                <div className="hidden lg:block">

                    <Sidebar />

                </div>

                {/* ===========================
                    Main Area
                ============================ */}

                <div className="flex-1 flex flex-col min-h-screen">

                    {/* Topbar */}

                    <Topbar

                        onOpenSidebar={() => setMobileOpen(true)}

                    />

                    {/* Page Content */}

                    <main
                        className="
                        flex-1

                        p-6

                        md:p-8

                        xl:p-10

                        overflow-y-auto
                        "
                    >

                        <Outlet />

                    </main>

                </div>

            </div>

        </div>

    );

}