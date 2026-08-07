import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./Footer"
import { Outlet } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import ScrollToTopButton from "../components/scroll/scrollToTopButton";
function Layout() {

  return (

    <>
    {/* Premium Scroll To Top */}
      <ScrollToTopButton />
      {/* Persistent Navbar */}
      <Navbar />
      <GlobalSearch />
      {/* Page content changes here only */}
      <main className="pt-[260px]">
        <Outlet />
      </main>
       <Footer />
    </>

  );

}


export default Layout;