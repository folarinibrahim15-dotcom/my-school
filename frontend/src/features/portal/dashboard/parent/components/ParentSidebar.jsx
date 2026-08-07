import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useLogoutMutation } from "../../../../../redux/api/authApi";
import { logout } from "../../../../../features/auth/authSlice";

export default function ParentSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());

      navigate("/portal/login");
    } catch (error) {
      console.error(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-white text-blue-700 font-semibold shadow"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-blue-800
        text-white
        flex
        flex-col
        shadow-xl
      "
    >
      {/* Logo */}
      <div className="px-6 py-8 border-b border-blue-700">
        <h1 className="text-2xl font-bold">
          Sound Peace
        </h1>

        <p className="text-sm text-blue-200 mt-1">
          Parent Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/portal/parent"
          end
          className={linkClass}
        >
          <FaHome size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/portal/parent"
          className={linkClass}
        >
          <FaUserCircle size={18} />
          Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500
            hover:bg-red-600
            transition
            font-semibold
          "
        >
          <FaSignOutAlt size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}