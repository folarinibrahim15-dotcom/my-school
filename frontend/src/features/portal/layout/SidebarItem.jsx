import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem({

    icon: Icon,

    title,

    path,

    collapsed,

}) {

    return (

        <NavLink

            to={path}

            className={({ isActive }) => `

                group

                flex

                items-center

                ${collapsed ? "justify-center" : "gap-4"}

                px-4

                py-3

                rounded-xl

                transition-all

                duration-300

                font-medium

                ${isActive

                    ? "bg-yellow-400 text-slate-900 shadow-lg"

                    : "text-slate-200 hover:bg-blue-800 hover:text-white"}

            `}

        >

            <Icon

                className="text-2xl shrink-0"

            />

            {!collapsed && (

                <span className="text-sm tracking-wide">

                    {title}

                </span>

            )}

        </NavLink>

    );

}