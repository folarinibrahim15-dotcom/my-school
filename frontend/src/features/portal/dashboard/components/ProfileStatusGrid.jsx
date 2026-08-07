import React from "react";

import AdminProfileCard from "./AdminProfileCard";
import SystemStatusCard from "./SystemStatusCard";

export default function ProfileStatusGrid() {

    return (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <AdminProfileCard />

            <SystemStatusCard />

        </div>

    );

}