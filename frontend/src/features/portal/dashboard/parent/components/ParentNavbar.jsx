import React from "react";
import { useSelector } from "react-redux";

import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

export default function ParentNavbar() {

  const user = useSelector(
    (state) => state.auth.user
  );

  const today = new Date().toLocaleDateString(
    "en-NG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (

    <header
      className="
        bg-white
        shadow-sm
        border-b
        border-slate-200
        px-6
        py-4
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        {/* Left */}

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-blue-900
            "
          >
            Parent Portal
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            {today}
          </p>

        </div>

        {/* Right */}

        <div
          className="
            flex
            items-center
            gap-6
          "
        >

          {/* Notification */}

          <button
            className="
              relative
              text-gray-600
              hover:text-blue-700
              transition
            "
          >

            <FaBell size={22} />

            <span
              className="
                absolute
                -top-1
                -right-2
                bg-red-500
                text-white
                text-[10px]
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              3
            </span>

          </button>

          {/* User */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <FaUserCircle
              size={40}
              className="text-blue-700"
            />

            <div>

              <h4
                className="
                  font-semibold
                  text-gray-800
                "
              >
                {user?.firstName} {user?.lastName}
              </h4>

              <p
                className="
                  text-sm
                  text-gray-500
                  capitalize
                "
              >
                {user?.role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );

}