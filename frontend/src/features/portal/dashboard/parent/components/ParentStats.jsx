import React from "react";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBell,
} from "react-icons/fa";

export default function ParentStats() {

  const stats = [
    {
      title: "My Children",
      value: "1",
      icon: <FaUserGraduate size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Attendance",
      value: "95%",
      icon: <FaClipboardCheck size={28} />,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Outstanding Fees",
      value: "₦0",
      icon: <FaMoneyBillWave size={28} />,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
    {
      title: "Notifications",
      value: "3",
      icon: <FaBell size={28} />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
  ];

  return (

    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            p-6
            border
            border-slate-200
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {item.value}
              </h2>

            </div>

            <div
              className={`
                ${item.bg}
                ${item.text}
                w-14
                h-14
                rounded-full
                flex
                items-center
                justify-center
              `}
            >
              {item.icon}
            </div>

          </div>

        </div>

      ))}

    </section>

  );

}