import React, { useState } from "react";

import SettingsSidebar from "../components/SettingsSidebar.jsx";

import SchoolSettings from "../components/SchoolSettings";
import AcademicSettings from "../components/AcademicSettings";
import UserSettings from "../components/UserSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";
import BackupSettings from "../components/BackupRestoreSettings";
import SystemSettings from "../components/SystemSettings";
import AboutSystem from "../components/AboutSystem";

export default function Settings() {

    const [activeTab, setActiveTab] = useState("school");

    const pages = {

        school: <SchoolSettings />,
        academic: <AcademicSettings />,
        users: <UserSettings />,
        appearance: <AppearanceSettings />,
        notifications: <NotificationSettings />,
        security: <SecuritySettings />,
        backup: <BackupSettings />,
        system: <SystemSettings />,
        about: <AboutSystem />,

    };


    return (

        <div
            className="
                flex
                flex-col
                lg:flex-row
                gap-6
                items-stretch
                w-full
            "
        >

            {/* Sidebar */}

            <div className="w-full lg:w-72">

                <SettingsSidebar

                    activeTab={activeTab}

                    setActiveTab={setActiveTab}

                />

            </div>


            {/* Main Content */}

            <div className="flex-1 w-full">

                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-gray-200
                        p-5
                        sm:p-6
                        lg:p-8
                        min-h-[700px]
                        w-full
                    "
                >

                    {pages[activeTab] || <SchoolSettings />}

                </div>

            </div>


        </div>

    );

}